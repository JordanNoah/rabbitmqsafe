"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertiesRabbitEventDto = void 0;
class PropertiesRabbitEventDto {
    constructor(contentType, contentEncoding, headers, deliveryMode, priority, correlationId, replyTo, expiration, messageId, timestamp, type, userId, appId, clusterId) {
        this.contentType = contentType;
        this.contentEncoding = contentEncoding;
        this.headers = headers;
        this.deliveryMode = deliveryMode;
        this.priority = priority;
        this.correlationId = correlationId;
        this.replyTo = replyTo;
        this.expiration = expiration;
        this.messageId = messageId;
        this.timestamp = timestamp;
        this.type = type;
        this.userId = userId;
        this.appId = appId;
        this.clusterId = clusterId;
    }
}
exports.PropertiesRabbitEventDto = PropertiesRabbitEventDto;
