import {Router} from "express";
import {EventDatasourceImpl} from "../../infrastructure/datasource/event.datasource.impl";
import {EventRepositoryImpl} from "../../infrastructure/repositories/event.repository.impl";
import {EventController} from "./controller";

export class EventRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new EventDatasourceImpl()
        const eventRepository = new EventRepositoryImpl(datasource)

        const controller = new EventController(eventRepository)
        router.post('/save', controller.createEvent)
        router.get('/id/:id', controller.getById)
        router.get('/', controller.getAll)
        router.post('/limited',controller.getLimited)
        return router;
    }
}