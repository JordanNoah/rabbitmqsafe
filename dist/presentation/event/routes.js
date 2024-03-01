"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventRoutes = void 0;
const express_1 = require("express");
const event_datasource_impl_1 = require("../../infrastructure/datasource/event.datasource.impl");
const event_repository_impl_1 = require("../../infrastructure/repositories/event.repository.impl");
const controller_1 = require("./controller");
class EventRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const datasource = new event_datasource_impl_1.EventDatasourceImpl();
        const eventRepository = new event_repository_impl_1.EventRepositoryImpl(datasource);
        const controller = new controller_1.EventController(eventRepository);
        router.post('/save', controller.createEvent);
        router.get('/id/:id', controller.getById);
        router.get('/', controller.getAll);
        router.post('/limited', controller.getLimited);
        router.post('/filter', controller.getByFilters);
        return router;
    }
}
exports.EventRoutes = EventRoutes;
