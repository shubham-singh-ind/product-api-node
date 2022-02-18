import { body, param, query } from "express-validator";

export class ProductValidators {
  static addVariant() {
    return [body("product_id", "Please enter valid Product ID").isNumeric()];
  }

  static addPresentmentPrice() {
    return [body("variant_id", "Please enter valid variant ID").isNumeric()];
  }

  static addOption() {
    return [body("product_id", "Please enter valid Product ID").isNumeric()];
  }

  static addImage() {
    return [body("product_id", "Please enter valid Product ID").isNumeric()];
  }

  static addMainImage() {
    return [body("product_id", "Please enter valid Product ID").isNumeric()];
  }

  static softDeleteProduct() {
    return [query("id", "Please enter valid Product ID").isNumeric()];
  }

  static getProductById() {
    return [query("id", "Please enter valid Product ID").isNumeric()];
  }
}
