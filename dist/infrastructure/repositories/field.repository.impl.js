"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldRepositoryImpl = void 0;
class FieldRepositoryImpl {
    constructor(fieldDatasource) {
        this.fieldDatasource = fieldDatasource;
    }
    register(fieldsRabbitEventDto) {
        return this.fieldDatasource.register(fieldsRabbitEventDto);
    }
    findByPk(id) {
        return this.fieldDatasource.findByPk(id);
    }
}
exports.FieldRepositoryImpl = FieldRepositoryImpl;
