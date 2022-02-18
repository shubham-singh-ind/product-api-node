import { DataTypes, Sequelize } from "sequelize";

export class Variants {
  static init(sequelize: Sequelize) {
    return sequelize.define(
      "variants",
      {
        product_id: {
          type: DataTypes.NUMBER,
        },
        title: {
          type: DataTypes.STRING,
        },
        price: {
          type: DataTypes.DECIMAL,
        },
        sku: {
          type: DataTypes.STRING,
        },
        position: {
          type: DataTypes.NUMBER,
        },
        inventory_policy: {
          type: DataTypes.STRING,
        },
        compare_at_price: {
          type: DataTypes.DECIMAL,
        },
        fulfillment_service: {
          type: DataTypes.STRING,
        },
        inventory_management: {
          type: DataTypes.STRING,
        },
        option1: {
          type: DataTypes.STRING,
        },
        option2: {
          type: DataTypes.STRING,
        },
        option3: {
          type: DataTypes.STRING,
        },
        taxable: {
          type: DataTypes.BOOLEAN,
        },
        barcode: {
          type: DataTypes.STRING,
        },
        grams: {
          type: DataTypes.NUMBER,
        },
        image_id: {
          type: DataTypes.NUMBER,
        },
        weight: {
          type: DataTypes.DECIMAL,
        },
        weight_unit: {
          type: DataTypes.STRING,
        },
        inventory_item_id: {
          type: DataTypes.NUMBER,
        },
        inventory_quantity: {
          type: DataTypes.NUMBER,
        },
        old_inventory_quantity: {
          type: DataTypes.NUMBER,
        },
        requires_shipping: {
          type: DataTypes.BOOLEAN,
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
