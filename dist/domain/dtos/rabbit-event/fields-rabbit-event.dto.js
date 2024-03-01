"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldsRabbitEventDto = void 0;
class FieldsRabbitEventDto {
    constructor(consumerTag, deliveryTag, redelivered, exchange, routingKey) {
        this.consumerTag = consumerTag;
        this.deliveryTag = deliveryTag;
        this.redelivered = redelivered;
        this.exchange = exchange;
        this.routingKey = routingKey;
    }
    static create(object) {
        const { consumerTag, deliveryTag, redelivered, exchange, routingKey } = object;
        return [
            undefined,
            new FieldsRabbitEventDto(consumerTag, deliveryTag, redelivered, exchange, routingKey)
        ];
    }
}
exports.FieldsRabbitEventDto = FieldsRabbitEventDto;
