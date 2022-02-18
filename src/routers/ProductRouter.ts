import { Router } from "express";
import { ProductController } from "../controllers/customer/ProductController";
import { GlobalMiddleWares } from "../middlewares/GlobalMiddleWares";
import { ProductValidators } from "../validators/ProductValidators";

class ProductRouter {
  public router: Router;
  constructor() {
    this.router = Router();
    this.getRoutes();
    this.postRoutes();
    this.deleteRoutes();
  }

  getRoutes() {
    this.router.get("/get-all", ProductController.getActiveProducts);
    this.router.get(
      "/get-by-id",
      ProductValidators.getProductById(),
      GlobalMiddleWares.checkError,
      ProductController.getProductById
    );
  }

  postRoutes() {
    this.router.post("/create", ProductController.createProduct);
    this.router.post(
      "/add-variant",
      ProductValidators.addVariant(),
      GlobalMiddleWares.checkError,
      ProductController.addVariant
    );
    this.router.post(
      "/add-presentment-price",
      ProductValidators.addPresentmentPrice(),
      GlobalMiddleWares.checkError,
      ProductController.addPresentmentPrice
    );
    this.router.post(
      "/add-option",
      ProductValidators.addOption(),
      GlobalMiddleWares.checkError,
      ProductController.addOption
    );
    this.router.post(
      "/add-image-list",
      ProductValidators.addImage(),
      GlobalMiddleWares.checkError,
      ProductController.addImage
    );
    this.router.post(
      "/add-main-image",
      ProductValidators.addMainImage(),
      GlobalMiddleWares.checkError,
      ProductController.addMainImage
    );
  }

  deleteRoutes() {
    this.router.delete(
      "/delete",
      ProductValidators.softDeleteProduct(),
      GlobalMiddleWares.checkError,
      ProductController.softDeleteProduct
    );
  }
}

export default new ProductRouter().router;
