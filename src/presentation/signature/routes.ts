import {Router} from "express";
import {SignatureController} from "./controller";
import {SignatureDatasourceImpl,SignatureRepositoryImpl} from "../../infrastructure"

export class SignatureRoutes {
    static get routes(): Router {
        const router = Router();

        const datasource = new SignatureDatasourceImpl()
        const signatureRepository = new SignatureRepositoryImpl(datasource)

        const controller = new SignatureController(signatureRepository);
        router.get('/', controller.getAll)
        router.get('/id/:id', controller.getById)
        router.get('/uuid/:uuid', controller.getByUuid)
        router.post('/save', controller.createSignature)
        router.delete('/uuid/:uuid', controller.deleteByUuid)
        router.delete('/id/:id', controller.deleteById)
        router.put('/',controller.update)
        router.put('/off/uuid/:uuid',controller.setOffSignature)
        router.put('/on/uuid/:uuid',controller.setOnSignature)
        return router;
    }
}