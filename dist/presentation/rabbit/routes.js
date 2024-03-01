"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RabbitRoutes = void 0;
const express_1 = require("express");
const rabbit_datasource_impl_1 = require("../../infrastructure/datasource/rabbit.datasource.impl");
const rabbit_repository_impl_1 = require("../../infrastructure/repositories/rabbit.repository.impl");
const controller_1 = require("./controller");
class RabbitRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const datasource = new rabbit_datasource_impl_1.RabbitDatasourceImpl();
        const rabbitRepository = new rabbit_repository_impl_1.RabbitRepositoryImpl(datasource);
        const controller = new controller_1.RabbitController(rabbitRepository);
        router.post("/publish", controller.publish);
        return router;
    }
}
exports.RabbitRoutes = RabbitRoutes;
