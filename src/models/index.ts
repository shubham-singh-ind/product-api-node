import { Sequelize } from "sequelize";
import { getEnvironmentVariables } from "../environments/env";
import { Image } from "./image";
import { Images } from "./images";
import { ImageVariantIds } from "./image_variant_ids";
import { Options } from "./options";
import { PresentmentPrices } from "./presentment_prices";
import { Price } from "./price";
import { Product } from "./product";
import { Variants } from "./variants";
import { Values } from "./_values";

let dbOptions = getEnvironmentVariables().db_options;
var sequelize = new Sequelize(
  dbOptions.db,
  dbOptions.username,
  dbOptions.password,
  {
    host: dbOptions.host,
    dialect: "mysql",
  }
);
sequelize
  .authenticate()
  .then((success) => console.log("connected"))
  .catch((err) => console.log("problem in connecting to sequelize:", err));

const Model = {
  Product: Product.init(sequelize),
  Variants: Variants.init(sequelize),
  Options: Options.init(sequelize),
  PresentmentPrices: PresentmentPrices.init(sequelize),
  Images: Images.init(sequelize),
  Image: Image.init(sequelize),
  ImageVariantIds: ImageVariantIds.init(sequelize),
  Price: Price.init(sequelize),
  Values: Values.init(sequelize),
};

export default Model;
