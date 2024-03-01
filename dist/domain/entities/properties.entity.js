"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertiesEntity = void 0;
class PropertiesEntity {
    constructor(id, contentType, contentEncoding, headers, deliveryMode, priority, correlationId, replyTo, expiration, messageId, timestamp, type, userId, appId, clusterId, createdAt, updatedAt) {
        this.id = id;
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
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
exports.PropertiesEntity = PropertiesEntity;
