"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventEntity = void 0;
class EventEntity {
    constructor(id, uuid, fieldId, propertyId, content, field, property, createdAt, updatedAt) {
        this.id = id;
        this.uuid = uuid;
        this.fieldId = fieldId;
        this.propertyId = propertyId;
        this.content = content;
        this.field = field;
        this.property = property;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
exports.EventEntity = EventEntity;
