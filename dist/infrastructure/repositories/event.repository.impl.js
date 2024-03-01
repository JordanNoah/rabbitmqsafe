"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventRepositoryImpl = void 0;
class EventRepositoryImpl {
    constructor(eventDatasource) {
        this.eventDatasource = eventDatasource;
    }
    register(receivedRabbitEventDto) {
        return this.eventDatasource.register(receivedRabbitEventDto);
    }
    getById(id) {
        return this.eventDatasource.getById(id);
    }
    getByUuid(uuid) {
        return this.eventDatasource.getByUuid(uuid);
    }
    getAll() {
        return this.eventDatasource.getAll();
    }
    getLimited(tableDto) {
        return this.eventDatasource.getLimited(tableDto);
    }
    getByFilters(filtersTableDto) {
        return this.eventDatasource.getByFilters(filtersTableDto);
    }
}
exports.EventRepositoryImpl = EventRepositoryImpl;
