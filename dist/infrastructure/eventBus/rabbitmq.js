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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rabbitmq = void 0;
const amqplib_1 = require("amqplib");
const config_1 = require("./config");
const config_2 = __importDefault(require("../../domain/config"));
const domain_1 = require("../../domain");
const custom_error_1 = require("../../domain/errors/custom.error");
const event_datasource_impl_1 = require("../datasource/event.datasource.impl");
const event_repository_impl_1 = require("../repositories/event.repository.impl");
const io_1 = require("../socket/io");
class Rabbitmq {
    static connection() {
        return __awaiter(this, void 0, void 0, function* () {
            this._connection = yield (0, amqplib_1.connect)(config_1.config);
            this._channel = yield this._connection.createConfirmChannel();
        });
    }
    static setQueue() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._channel.assertQueue(config_2.default.RABBIT_QUEUE, config_1.assertQueue);
            yield this._channel.assertExchange(config_2.default.RABBIT_EXCHANGE, config_2.default.RABBIT_TYPE_EXCHANGE, config_1.assertExchange);
            yield this._channel.bindQueue(config_2.default.RABBIT_QUEUE, config_2.default.RABBIT_EXCHANGE, config_2.default.RABBIT_ROUTING_KEY);
            yield this._channel.prefetch(config_2.default.RABBIT_PREFETCH);
        });
    }
    static consume() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._channel.consume(config_2.default.RABBIT_QUEUE, (msg) => __awaiter(this, void 0, void 0, function* () {
                try {
                    io_1.SocketManager.emit('isSyncRabbit', { sync: true });
                    const datasource = new event_datasource_impl_1.EventDatasourceImpl();
                    const eventRepository = new event_repository_impl_1.EventRepositoryImpl(datasource);
                    const [error, receivedRabbitEventDto] = domain_1.ReceivedRabbitEventDto.create(msg);
                    if (error)
                        throw custom_error_1.CustomError.internalSever('error');
                    eventRepository.register(receivedRabbitEventDto).then((event) => {
                        console.log("Event consumed");
                        this._channel.ack(msg);
                    }).catch((error) => {
                        console.log(error);
                        console.log("Event ignored");
                    }).finally(() => {
                        io_1.SocketManager.emit('isSyncRabbit', { sync: false });
                    });
                }
                catch (error) {
                    if (error instanceof custom_error_1.CustomError) {
                        throw error;
                    }
                    throw custom_error_1.CustomError.internalSever();
                }
            }));
        });
    }
    static init() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connection();
            yield this.setQueue();
            yield this.consume();
        });
    }
}
exports.Rabbitmq = Rabbitmq;
