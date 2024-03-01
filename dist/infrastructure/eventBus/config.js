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
exports.eventList = exports.assertExchange = exports.assertQueue = exports.config = void 0;
const config_1 = __importDefault(require("../../domain/config"));
const signature_datasource_impl_1 = require("../datasource/signature.datasource.impl");
exports.config = {
    username: config_1.default.RABBIT_USERNAME,
    password: config_1.default.RABBIT_PASSWORD,
    protocol: config_1.default.RABBIT_PROTOCOL,
    hostname: config_1.default.RABBIT_HOSTNAME,
    port: 5672,
    vhost: config_1.default.RABBIT_VHOST
};
exports.assertQueue = {
    exclusive: false,
    durable: true
};
exports.assertExchange = {
    durable: true
};
const eventList = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield new signature_datasource_impl_1.SignatureDatasourceImpl().getAll();
});
exports.eventList = eventList;
