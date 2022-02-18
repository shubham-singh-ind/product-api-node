import { DataTypes, Sequelize } from "sequelize";

export class Image {
  static init(sequelize: Sequelize) {
    return sequelize.define(
      "image",
      {
        product_id: {
          type: DataTypes.NUMBER,
        },
        position: {
          type: DataTypes.NUMBER,
        },
        alt: {
          type: DataTypes.STRING,
        },
        width: {
          type: DataTypes.NUMBER,
        },
        height: {
          type: DataTypes.NUMBER,
        },
        src: {
          type: DataTypes.STRING,
        },
        admin_graphql_api_id: {
          type: DataTypes.STRING,
        },
        created_at: {
          type: DataTypes.DATE,
        },
        updated_at: {
          type: DataTypes.DATE,
        },
      },
      {
        freezeTableName: true,
        timestamps: false,
      }
    );
  }
}
