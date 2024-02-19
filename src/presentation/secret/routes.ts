import {Router} from "express";
import {SecretDatasource} from "../../domain/datasources/secret.datasource";
import {SecretDatasourceImpl} from "../../infrastructure/datasource/secret.datasource.impl";
import {SecretRepositoryImpl} from "../../infrastructure/repositories/secret.repository.impl";
import {SecretController} from "./controller";

export class SecretRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new SecretDatasourceImpl()
        const secretRepository = new SecretRepositoryImpl(datasource)

        const controller = new SecretController(secretRepository)

        router.post('/encrypt',controller.encrypt)
        router.post('/desEncrypt',controller.desEncrypt)

        return router;
    }
}