import { Sequelize } from "sequelize";
import { getEnvironmentVariables } from "../environments/env";
import { Customer } from "./customer";
import { Otp } from "./otp";

let dbOptions = getEnvironmentVariables().db_options;
var sequelize = new Sequelize(dbOptions.db, dbOptions.username, dbOptions.password, {
    host: dbOptions.host,
    dialect: 'mysql'
});
sequelize.authenticate().then((success)=> console.log('connected')).catch((err) => console.log('problem in connecting to sequelize:', err));

const Model = {
    Customer: Customer.init(sequelize),
    Otp: Otp.init(sequelize)
}

export default Model;