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
exports.PropertyDatasourceImpl = void 0;
const custom_error_1 = require("../../domain/errors/custom.error");
const Properties_1 = require("../database/models/Properties");
class PropertyDatasourceImpl {
    register(propertiesRabbitEventDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield Properties_1.SequelizeProperty.create({
                    contentType: propertiesRabbitEventDto.contentType,
                    contentEncoding: propertiesRabbitEventDto.contentEncoding,
                    headers: propertiesRabbitEventDto.contentEncoding,
                    deliveryMode: propertiesRabbitEventDto.deliveryMode,
                    priority: propertiesRabbitEventDto.priority,
                    correlationId: propertiesRabbitEventDto.correlationId,
                    replyTo: propertiesRabbitEventDto.replyTo,
                    appId: propertiesRabbitEventDto.appId,
                    type: propertiesRabbitEventDto.type,
                    clusterId: propertiesRabbitEventDto.clusterId,
                    expiration: propertiesRabbitEventDto.expiration,
                    messageId: propertiesRabbitEventDto.messageId,
                    userId: propertiesRabbitEventDto.userId,
                    timestamp: propertiesRabbitEventDto.timestamp
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
                return yield Properties_1.SequelizeProperty.findByPk(id);
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
exports.PropertyDatasourceImpl = PropertyDatasourceImpl;
