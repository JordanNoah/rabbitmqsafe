"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SequelizeField = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("../sequelize");
class SequelizeField extends sequelize_1.Model {
}
exports.SequelizeField = SequelizeField;
SequelizeField.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    consumerTag: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    deliveryTag: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    redelivered: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: true
    },
    exchange: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    routingKey: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize: sequelize_2.sequelize,
    timestamps: true,
    tableName: 'field'
});
