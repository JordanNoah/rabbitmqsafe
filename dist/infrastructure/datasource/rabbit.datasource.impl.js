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
exports.RabbitDatasourceImpl = void 0;
const custom_error_1 = require("../../domain/errors/custom.error");
const secret_datasource_impl_1 = require("./secret.datasource.impl");
const amqplib_1 = require("amqplib");
const event_datasource_impl_1 = require("./event.datasource.impl");
class RabbitDatasourceImpl {
    sendToRabbit(rabbitSendConfigDto) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const secretDatasourceImpl = new secret_datasource_impl_1.SecretDatasourceImpl();
                const eventDatasourceImpl = new event_datasource_impl_1.EventDatasourceImpl();
                let rabbitConfig = {
                    username: yield secretDatasourceImpl.desEncrypt(rabbitSendConfigDto.username),
                    password: yield secretDatasourceImpl.desEncrypt(rabbitSendConfigDto.password),
                    protocol: yield secretDatasourceImpl.desEncrypt(rabbitSendConfigDto.protocol),
                    hostname: yield secretDatasourceImpl.desEncrypt(rabbitSendConfigDto.hostname),
                    port: yield secretDatasourceImpl.desEncrypt(String(rabbitSendConfigDto.port)),
                    vhost: yield secretDatasourceImpl.desEncrypt(rabbitSendConfigDto.vhost),
                    queue: yield secretDatasourceImpl.desEncrypt(rabbitSendConfigDto.queue),
                    exchange: yield secretDatasourceImpl.desEncrypt(rabbitSendConfigDto.exchange),
                    routingKey: yield secretDatasourceImpl.desEncrypt(rabbitSendConfigDto.routingKey),
                    sendType: yield secretDatasourceImpl.desEncrypt(rabbitSendConfigDto.sendType)
                };
                const eventToPublish = yield eventDatasourceImpl.getByUuid(rabbitSendConfigDto.uuidEvent);
                if (!eventToPublish)
                    throw custom_error_1.CustomError.notFound('Event not found');
                const configRabbit = {
                    username: rabbitConfig.username,
                    password: rabbitConfig.password,
                    protocol: rabbitConfig.protocol,
                    hostname: rabbitConfig.hostname,
                    port: parseInt(rabbitConfig.port),
                    vhost: rabbitConfig.vhost
                };
                const options = {
                    appId: eventToPublish.property.appId,
                    type: eventToPublish.property.type,
                    timestamp: eventToPublish.property.timestamp,
                    messageId: eventToPublish.property.messageId,
                    deliveryMode: eventToPublish.property.deliveryMode,
                    contentType: eventToPublish.property.contentType
                };
                const rabbitConnection = yield (0, amqplib_1.connect)(configRabbit);
                const channel = yield rabbitConnection.createConfirmChannel();
                const queue = yield channel.assertQueue(rabbitConfig.queue, { durable: true });
                if (rabbitConfig.sendType === "exclusive") {
                    channel.sendToQueue(queue.queue, Buffer.from((_a = eventToPublish.content) !== null && _a !== void 0 ? _a : ''), options, (err, ok) => {
                        if (err) {
                            throw custom_error_1.CustomError.internalSever(err);
                        }
                    });
                }
                else {
                    const exchange = yield channel.assertExchange(rabbitConfig.exchange, 'fanout');
                    yield channel.bindQueue(rabbitConfig.queue, exchange.exchange, rabbitConfig.routingKey);
                    channel.publish(exchange.exchange, rabbitConfig.routingKey, Buffer.from((_b = eventToPublish.content) !== null && _b !== void 0 ? _b : ''), options, (err, ok) => {
                        if (err) {
                            throw custom_error_1.CustomError.internalSever(err);
                        }
                    });
                }
                return eventToPublish;
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
exports.RabbitDatasourceImpl = RabbitDatasourceImpl;
