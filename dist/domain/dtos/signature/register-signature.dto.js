"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterSignatureDto = void 0;
class RegisterSignatureDto {
    constructor(uuid, name) {
        this.uuid = uuid;
        this.name = name;
    }
    static create(object) {
        const { uuid, name } = object;
        if (!uuid)
            return ['Missing uuid'];
        if (!name)
            return ['Missing name'];
        return [
            undefined,
            new RegisterSignatureDto(uuid, name)
        ];
    }
}
exports.RegisterSignatureDto = RegisterSignatureDto;
