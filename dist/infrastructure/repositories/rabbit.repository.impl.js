"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RabbitRepositoryImpl = void 0;
class RabbitRepositoryImpl {
    constructor(rabbitDatasource) {
        this.rabbitDatasource = rabbitDatasource;
    }
    sendToRabbit(rabbitSendConfigDto) {
        return this.rabbitDatasource.sendToRabbit(rabbitSendConfigDto);
    }
}
exports.RabbitRepositoryImpl = RabbitRepositoryImpl;
