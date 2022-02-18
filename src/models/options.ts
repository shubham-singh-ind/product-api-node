import { DataTypes, Sequelize } from "sequelize";

export class Options {
  static init(sequelize: Sequelize) {
    return sequelize.define(
      "options",
      {
        product_id: {
          type: DataTypes.NUMBER,
        },
        name: {
          type: DataTypes.STRING,
        },
        position: {
          type: DataTypes.NUMBER,
        },
      },
      {
        freezeTableName: true,
        timestamps: false,
      }
    );
  }
}
