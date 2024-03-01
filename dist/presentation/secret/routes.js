"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecretRoutes = void 0;
const express_1 = require("express");
const secret_datasource_impl_1 = require("../../infrastructure/datasource/secret.datasource.impl");
const secret_repository_impl_1 = require("../../infrastructure/repositories/secret.repository.impl");
const controller_1 = require("./controller");
class SecretRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const datasource = new secret_datasource_impl_1.SecretDatasourceImpl();
        const secretRepository = new secret_repository_impl_1.SecretRepositoryImpl(datasource);
        const controller = new controller_1.SecretController(secretRepository);
        router.post('/encrypt', controller.encrypt);
        router.post('/desEncrypt', controller.desEncrypt);
        return router;
    }
}
exports.SecretRoutes = SecretRoutes;
