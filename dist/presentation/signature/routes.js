"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignatureRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const infrastructure_1 = require("../../infrastructure");
class SignatureRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const datasource = new infrastructure_1.SignatureDatasourceImpl();
        const signatureRepository = new infrastructure_1.SignatureRepositoryImpl(datasource);
        const controller = new controller_1.SignatureController(signatureRepository);
        router.get('/', controller.getAll);
        router.get('/id/:id', controller.getById);
        router.get('/uuid/:uuid', controller.getByUuid);
        router.post('/save', controller.createSignature);
        router.delete('/uuid/:uuid', controller.deleteByUuid);
        router.delete('/id/:id', controller.deleteById);
        router.put('/', controller.update);
        router.put('/off/uuid/:uuid', controller.setOffSignature);
        router.put('/on/uuid/:uuid', controller.setOnSignature);
        return router;
    }
}
exports.SignatureRoutes = SignatureRoutes;
