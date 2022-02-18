import { DataTypes, Sequelize } from "sequelize";

export class PresentmentPrices {
  static init(sequelize: Sequelize) {
    return sequelize.define(
      "presentment_prices",
      {
        variant_id: {
          type: DataTypes.NUMBER,
        },
        compare_at_price: {
          type: DataTypes.DECIMAL,
        },
      },
      {
        freezeTableName: true,
        timestamps: false,
      }
    );
  }
}
