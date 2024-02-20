import {Router} from "express"
import {RabbitDatasourceImpl} from "../../infrastructure/datasource/rabbit.datasource.impl";
import {RabbitRepositoryImpl} from "../../infrastructure/repositories/rabbit.repository.impl";
import {RabbitController} from "./controller";
export class RabbitRoutes {
    static get routes(): Router{
        const router = Router();

        const datasource = new RabbitDatasourceImpl()
        const rabbitRepository = new RabbitRepositoryImpl(datasource)

        const controller = new RabbitController(rabbitRepository)

        router.post("/publish", controller.publish)

        return router
    }
}