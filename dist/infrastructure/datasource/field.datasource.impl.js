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
exports.FieldDatasourceImpl = void 0;
const custom_error_1 = require("../../domain/errors/custom.error");
const Fields_1 = require("../database/models/Fields");
class FieldDatasourceImpl {
    register(fieldsRabbitEventDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield Fields_1.SequelizeField.create({
                    routingKey: fieldsRabbitEventDto.routingKey,
                    consumerTag: fieldsRabbitEventDto.consumerTag,
                    exchange: fieldsRabbitEventDto.exchange,
                    deliveryTag: fieldsRabbitEventDto.deliveryTag,
                    redelivered: fieldsRabbitEventDto.redelivered
                });
            }
            catch (error) {
                if (error instanceof custom_error_1.CustomError) {
                    throw error;
                }
                throw custom_error_1.CustomError.internalSever();
            }
        });
    }
    findByPk(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield Fields_1.SequelizeField.findByPk(id);
            }
            catch (error) {
                if (error instanceof custom_error_1.CustomError) {
                    throw error;
                }
                throw custom_error_1.CustomError.internalSever();
            }
        });
    }
}
exports.FieldDatasourceImpl = FieldDatasourceImpl;
