"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReceivedRabbitEventDto = void 0;
class ReceivedRabbitEventDto {
    constructor(fields, properties, content) {
        this.fields = fields;
        this.properties = properties;
        this.content = content;
    }
    static create(object) {
        const { fields, properties, content } = object;
        if (!fields)
            return ['Missing fields structure', undefined];
        if (!properties)
            return ['Missing properties structure', undefined];
        return [
            undefined,
            new ReceivedRabbitEventDto(fields, properties, content)
        ];
    }
}
exports.ReceivedRabbitEventDto = ReceivedRabbitEventDto;
