"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const config_1 = __importDefault(require("../../domain/config"));
exports.config = {
    host: config_1.default.DB_HOST,
    username: config_1.default.DB_USERNAME,
    password: config_1.default.DB_PASSWORD,
    logging: (msg) => false,
    port: parseInt(config_1.default.DB_PORT),
    database: config_1.default.DB_NAME,
    dialect: "mysql"
};
