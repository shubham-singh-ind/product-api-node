import { DataTypes, Sequelize } from "sequelize";

export class Product {
  static init(sequelize: Sequelize) {
    return sequelize.define(
      "product",
      {
        title: {
          type: DataTypes.STRING,
        },
        body_html: {
          type: DataTypes.STRING,
        },
        vendor: {
          type: DataTypes.STRING,
        },
        product_type: {
          type: DataTypes.STRING,
        },
        handle: {
          type: DataTypes.STRING,
        },
        published_at: {
          type: DataTypes.DATE,
        },
        template_suffix: {
          type: DataTypes.STRING,
        },
        status: {
          type: DataTypes.STRING,
        },
        published_scope: {
          type: DataTypes.STRING,
        },
        tags: {
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
