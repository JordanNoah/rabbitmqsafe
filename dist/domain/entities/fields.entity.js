"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldsEntity = void 0;
class FieldsEntity {
    constructor(id, consumerTag, deliveryTag, redelivered, exchange, routingKey, createdAt, updatedAt) {
        this.id = id;
        this.consumerTag = consumerTag;
        this.deliveryTag = deliveryTag;
        this.redelivered = redelivered;
        this.exchange = exchange;
        this.routingKey = routingKey;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
exports.FieldsEntity = FieldsEntity;
