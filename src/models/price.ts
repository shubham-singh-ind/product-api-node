import { DataTypes, Sequelize } from "sequelize";

export class Price {
  static init(sequelize: Sequelize) {
    return sequelize.define(
      "price",
      {
        presentment_price_id: {
          type: DataTypes.NUMBER,
        },
        amount: {
          type: DataTypes.DECIMAL,
        },
        currency_code: {
          type: DataTypes.STRING,
        },
      },
      {
        freezeTableName: true,
        timestamps: false,
      }
    );
  }
}
