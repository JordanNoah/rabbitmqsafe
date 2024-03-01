"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyRepositoryImpl = void 0;
class PropertyRepositoryImpl {
    constructor(propertyDatasource) {
        this.propertyDatasource = propertyDatasource;
    }
    register(propertiesRabbitEventDto) {
        return this.propertyDatasource.register(propertiesRabbitEventDto);
    }
    findByPk(id) {
        return this.propertyDatasource.findByPk(id);
    }
}
exports.PropertyRepositoryImpl = PropertyRepositoryImpl;
