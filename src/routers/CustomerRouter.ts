import { Router } from "express";
import { CustomerController } from "../controllers/customer/CustomerController";
import { GlobalMiddleWares } from "../middlewares/GlobalMiddleWares";
import { CustomerValidators } from "../validators/CustomerValidators";

class CustomerRouter {
  public router: Router;
  constructor() {
    this.router = Router();
    this.getRoutes();
    this.postRoutes();
    this.deleteRoutes();
  }

  getRoutes() { 
 
  }

  postRoutes() {
    this.router.post( "/login", CustomerValidators.login(), CustomerController.login);
    this.router.post( "/signup", CustomerValidators.signup(), CustomerController.signup);
    this.router.post( "/sendotp", CustomerController.sendOtp);
    this.router.post( "/verifyotp", CustomerController.verifyOtp);
    this.router.post( "/resetpassword", CustomerController.resetPassword);
  }
  
  deleteRoutes() {}
}

export default new CustomerRouter().router;
