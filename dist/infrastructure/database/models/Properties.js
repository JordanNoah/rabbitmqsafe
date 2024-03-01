"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SequelizeProperty = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("../sequelize");
class SequelizeProperty extends sequelize_1.Model {
}
exports.SequelizeProperty = SequelizeProperty;
SequelizeProperty.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    contentType: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    contentEncoding: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    headers: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    deliveryMode: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    priority: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    correlationId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    replyTo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    expiration: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    messageId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    timestamp: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: true
    },
    type: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    userId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    appId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    clusterId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
}, {
    sequelize: sequelize_2.sequelize,
    timestamps: true,
    tableName: 'property'
});
