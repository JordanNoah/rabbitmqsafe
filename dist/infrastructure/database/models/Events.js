"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SequelizeEvent = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("../sequelize");
class SequelizeEvent extends sequelize_1.Model {
}
exports.SequelizeEvent = SequelizeEvent;
SequelizeEvent.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    uuid: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false
    },
    content: {
        type: sequelize_1.DataTypes.TEXT('long'),
        allowNull: true
    },
    fieldId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    propertyId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize: sequelize_2.sequelize,
    timestamps: true,
    tableName: 'event'
});
