import { DataTypes, Sequelize } from "sequelize";

export class Values {
  static init(sequelize: Sequelize) {
    return sequelize.define(
      "_values",
      {
        option_id: {
          type: DataTypes.NUMBER,
        },
        name: {
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
