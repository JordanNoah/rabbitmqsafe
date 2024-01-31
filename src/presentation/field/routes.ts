import {Router} from "express";
import {FieldDatasourceImpl} from "../../infrastructure/datasource/field.datasource.impl";

export class FieldRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new FieldDatasourceImpl()
        const fie

        return router;
    }
}