"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldRoutes = void 0;
const express_1 = require("express");
const field_datasource_impl_1 = require("../../infrastructure/datasource/field.datasource.impl");
const field_repository_impl_1 = require("../../infrastructure/repositories/field.repository.impl");
const controller_1 = require("./controller");
class FieldRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const datasource = new field_datasource_impl_1.FieldDatasourceImpl();
        const fieldRepository = new field_repository_impl_1.FieldRepositoryImpl(datasource);
        const controller = new controller_1.FieldController(fieldRepository);
        router.post('/save', controller.createField);
        return router;
    }
}
exports.FieldRoutes = FieldRoutes;
