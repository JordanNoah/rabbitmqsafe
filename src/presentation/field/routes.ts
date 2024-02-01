import {Router} from "express";
import {FieldDatasourceImpl} from "../../infrastructure/datasource/field.datasource.impl";
import {FieldRepositoryImpl} from "../../infrastructure/repositories/field.repository.impl";
import {FieldController} from "./controller";

export class FieldRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new FieldDatasourceImpl()
        const fieldRepository = new FieldRepositoryImpl(datasource)

        const controller = new FieldController(fieldRepository);

        router.post('/save', controller.createField)

        return router;
    }
}