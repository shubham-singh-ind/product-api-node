import { DataTypes, Sequelize } from "sequelize";

export class Customer {
    static init(sequelize: Sequelize) {
        return sequelize.define(
            "customer",
            {
                first_name : {
                    type: DataTypes.STRING
                },
                last_name : {
                    type: DataTypes.STRING
                },
                email : {
                    type: DataTypes.STRING
                },
                mobile : {
                    type: DataTypes.STRING
                },
                password_hash: {
                    type: DataTypes.STRING
                },
                status : {
                    type: DataTypes.NUMBER
                },
                createdAt: {
                    type: DataTypes.BIGINT,
                    defaultValue: Date.now()
                },
                updatedAt: {
                    type: DataTypes.BIGINT,
                    defaultValue: Date.now()
                },
            },
            {
                freezeTableName: true
            }
        );
    }
}
