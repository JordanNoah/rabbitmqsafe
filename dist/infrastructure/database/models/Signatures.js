"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SequelizeSignature = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("../sequelize");
class SequelizeSignature extends sequelize_1.Model {
}
exports.SequelizeSignature = SequelizeSignature;
SequelizeSignature.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    uuid: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false
    },
    name: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    active: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    sequelize: sequelize_2.sequelize,
    timestamps: true,
    tableName: 'signature'
});
