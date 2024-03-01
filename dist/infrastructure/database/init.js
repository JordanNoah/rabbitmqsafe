"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbSequelize = void 0;
const Fields_1 = require("./models/Fields");
const Events_1 = require("./models/Events");
const Properties_1 = require("./models/Properties");
const sequelize_1 = require("./sequelize");
const DbSequelize = () => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        Events_1.SequelizeEvent.belongsTo(Fields_1.SequelizeField, { foreignKey: 'fieldId', as: 'field' });
        Events_1.SequelizeEvent.belongsTo(Properties_1.SequelizeProperty, { foreignKey: 'propertyId', as: 'property' });
        sequelize_1.sequelize.sync({ force: false }).then(() => {
            resolve();
        }).catch((err) => {
            console.log(err);
            reject();
        });
    }));
};
exports.DbSequelize = DbSequelize;
