import * as express from "express";
import * as Jwt from "jsonwebtoken";
import * as otpGenerator from "otp-generator";
import * as bcrypt from "bcrypt";

import { getEnvironmentVariables } from "../../environments/env";
import Model from "../../models";

export class ProductController {
  static async createProduct(req, res, next) {
    try {
      const data = {
        ...req.body.product,
      };

      if (data.id) {
        console.log(
          "INFO: ID exists in body, checking if data already exists."
        );

        const product = await Model.Product.findOne({ where: { id: data.id } });
        if (product) {
          const error = new Error("ID already exists");
          req.errorStatus = 409;
          return next(error);
        }
      }

      const createdProduct = await Model.Product.create(data);

      return res.json({
        status: 200,
        message: "Product created",
        products: createdProduct,
      });
    } catch (err) {
      next(err);
    }
  }

  static async softDeleteProduct(req, res, next) {
    try {
      const { id } = req.query;

      const product = await Model.Product.findOne({ where: { id: id } });
      if (!product) {
        return res.json({
          status: 404,
          message: "Product not found. Please provide valid id.",
        });
      }

      await Model.Product.update({ status: "inactive" }, { where: { id: id } });

      return res.json({
        status: 200,
        message: "Product deleted",
      });
    } catch (err) {
      next(err);
    }
  }

  // INFO: Only returns basic product info. It can be modified for complete product detail.
  static async getActiveProducts(req, res, next) {
    try {
      const products: any = await Model.Product.findAll({
        where: { status: "active" },
      });

      if (!products) {
        return res.status(404).json({
          status: 404,
          message: "No active products available.",
        });
      }

      return res.json({
        status: 200,
        message: "Product fetched",
        products: products,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getProductById(req, res, next) {
    try {
      const { id } = req.query;

      const product: any = await Model.Product.findOne({
        where: { id: id, status: "active" },
        raw: true,
      });

      if (!product) {
        return res.status(404).json({
          status: 404,
          message:
            "No active product available. Please provide valid product id.",
        });
      }

      // Begin:Fetching variants and its childs
      let variants: any = await Model.Variants.findAll({
        where: { product_id: id },
        raw: true,
      });

      variants = await Promise.all(
        variants.map(async (variant: any) => {
          let presentmentPrices: any = await Model.PresentmentPrices.findAll({
            where: { variant_id: variant.id },
            raw: true,
          });
          presentmentPrices = await Promise.all(
            presentmentPrices.map(async (presentmentPrice: any) => {
              const price = await Model.Price.findOne({
                where: { presentment_price_id: presentmentPrice.id },
                raw: true,
              });
              return {
                ...presentmentPrice,
                price: price,
              };
            })
          );

          return {
            ...variant,
            presentment_prices: presentmentPrices,
          };
        })
      );
      product.variants = variants;
      // End:Fetching variants and its childs

      // Begin:Fetching options and its childs
      let options: any = await Model.Options.findAll({
        where: { product_id: id },
        raw: true,
      });
      options = await Promise.all(
        options.map(async (option: any) => {
          let values = await Model.Values.findAll({
            where: { option_id: option.id },
            raw: true,
          });

          return {
            ...option,
            values: values.map((value: any) => value.name),
          };
        })
      );
      product.options = options;
      // Begin:Fetching options and its childs

      // Begin:Fetching images and its childs
      let images: any = await Model.Images.findAll({
        where: { product_id: id },
        raw: true,
      });
      images = await Promise.all(
        images.map(async (image: any) => {
          let variantIds = await Model.ImageVariantIds.findAll({
            where: { image_id: image.id },
            raw: true,
          });

          return {
            ...image,
            variant_ids: variantIds.map((value: any) => value.variant_id),
          };
        })
      );
      product.images = images;
      // Begin:Fetching images and its childs

      // Begin:Fetching image
      let image: any = await Model.Image.findOne({
        where: { product_id: id },
        raw: true,
      });
      if (image) {
        let variantIds = await Model.ImageVariantIds.findAll({
          where: { image_id: image.id },
          raw: true,
        });
        image.variant_ids = variantIds;
      }
      product.image = image;
      // Begin:Fetching image

      return res.json({
        status: 200,
        message: "Product fetched",
        product: product,
      });
    } catch (err) {
      next(err);
    }
  }

  static async addVariant(req, res, next) {
    try {
      const { product_id } = req.body;
      const data = {
        ...req.body,
      };

      const product: any = await Model.Product.findOne({
        where: { id: product_id, status: "active" },
      });

      if (!product) {
        return res.status(404).json({
          status: 404,
          message:
            "No active product available. Please provide valid product id.",
        });
      }
      if (data.id) {
        console.log(
          "INFO: ID exists in body, checking if data already exists."
        );

        const variant = await Model.Variants.findOne({
          where: { id: data.id },
        });
        if (variant) {
          const error = new Error("ID already exists");
          req.errorStatus = 409;
          return next(error);
        }
      }

      const createdVariant = await Model.Variants.create(data);

      return res.json({
        status: 200,
        message: "Variant added",
        variant: createdVariant,
      });
    } catch (err) {
      next(err);
    }
  }

  static async addPresentmentPrice(req, res, next) {
    try {
      const { variant_id } = req.body;
      const priceData = {
        ...req.body.price,
      };

      const variant: any = await Model.Variants.findOne({
        where: { id: variant_id },
      });

      if (!variant) {
        return res.status(404).json({
          status: 404,
          message: "No product available. Please provide valid variant id.",
        });
      }

      const createdPresentmentPrice: any = await Model.PresentmentPrices.create(
        { variant_id: variant_id, compare_at_price: req.body.compare_at_price }
      );
      priceData.presentment_price_id = createdPresentmentPrice.id;
      const createdPrice = await Model.Price.create(priceData);

      return res.json({
        status: 200,
        message: "Presentment Price added",
        presentmentPrice: createdPresentmentPrice,
        price: createdPrice,
      });
    } catch (err) {
      next(err);
    }
  }

  static async addOption(req, res, next) {
    try {
      const { product_id } = req.body;
      const data = {
        ...req.body,
      };

      const product: any = await Model.Product.findOne({
        where: { id: product_id, status: "active" },
      });

      if (!product) {
        return res.status(404).json({
          status: 404,
          message:
            "No active product available. Please provide valid product id.",
        });
      }
      if (data.id) {
        console.log(
          "INFO: ID exists in body, checking if data already exists."
        );

        const option = await Model.Options.findOne({
          where: { id: data.id },
        });
        if (option) {
          const error = new Error("ID already exists");
          req.errorStatus = 409;
          return next(error);
        }
      }

      const createdOption: any = await Model.Options.create(data);
      const values = data.values;
      values.forEach(async (value) => {
        const createdValues = await Model.Values.create({
          option_id: createdOption.id,
          name: value,
        });
      });

      return res.json({
        status: 200,
        message: "Option added",
        option: createdOption,
      });
    } catch (err) {
      next(err);
    }
  }

  static async addImage(req, res, next) {
    try {
      const { product_id } = req.body;
      const data = {
        ...req.body,
      };

      const product: any = await Model.Product.findOne({
        where: { id: product_id, status: "active" },
      });

      if (!product) {
        return res.status(404).json({
          status: 404,
          message:
            "No active product available. Please provide valid product id.",
        });
      }
      if (data.id) {
        console.log(
          "INFO: ID exists in body, checking if data already exists."
        );

        const image = await Model.Images.findOne({
          where: { id: data.id },
        });
        if (image) {
          const error = new Error("ID already exists");
          req.errorStatus = 409;
          return next(error);
        }
      }

      const createdImage: any = await Model.Images.create(data); // Images table used.
      if (data.variant_ids) {
        const variantIds = data.variant_ids;
        variantIds.forEach(async (variantId) => {
          await Model.ImageVariantIds.create({
            image_id: createdImage.id,
            variant_id: variantId,
          });
        });
      }

      return res.json({
        status: 200,
        message: "Image added",
        image: createdImage,
      });
    } catch (err) {
      next(err);
    }
  }

  static async addMainImage(req, res, next) {
    try {
      const { product_id } = req.body;
      const data = {
        ...req.body,
      };

      const product: any = await Model.Product.findOne({
        where: { id: product_id, status: "active" },
      });

      if (!product) {
        return res.status(404).json({
          status: 404,
          message:
            "No active product available. Please provide valid product id.",
        });
      }
      if (data.id) {
        console.log(
          "INFO: ID exists in body, checking if data already exists."
        );

        const image = await Model.Image.findOne({
          where: { id: data.id },
        });
        if (image) {
          const error = new Error("ID already exists");
          req.errorStatus = 409;
          return next(error);
        }
      }

      const createdImage: any = await Model.Image.create(data); // Image table used.
      if (data.variant_ids) {
        const variantIds = data.variant_ids;
        variantIds.forEach(async (variantId) => {
          await Model.ImageVariantIds.create({
            image_id: createdImage.id,
            variant_id: variantId,
          });
        });
      }

      return res.json({
        status: 200,
        message: "Image added",
        image: createdImage,
      });
    } catch (err) {
      next(err);
    }
  }
}
