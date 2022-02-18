import { DataTypes, Sequelize } from "sequelize";

export class ImageVariantIds {
  static init(sequelize: Sequelize) {
    return sequelize.define(
      "image_variant_ids",
      {
        image_id: {
          type: DataTypes.NUMBER,
        },
        variant_id: {
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
