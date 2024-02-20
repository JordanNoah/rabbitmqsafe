import { Router } from "express"
import path from "path";
import {SignatureRoutes} from "./signature/routes";
import {EventRoutes} from "./event/routes";
import {FieldRoutes} from "./field/routes";
import {SecretRoutes} from "./secret/routes";
import {RabbitRoutes} from "./rabbit/routes";

export class AppRoutes {
    static get routes(): Router {
        const router = Router()
            router.get('/',(req,res) => {
                res.sendFile(path.join(__dirname,'./public/index.html'))
            })

            router.use('/api/signature', SignatureRoutes.routes)
            router.use('/api/event', EventRoutes.routes)
            router.use('/api/field', FieldRoutes.routes)
            router.use('/api/secret', SecretRoutes.routes)
            router.use('/api/rabbit', RabbitRoutes.routes)

        return router
    }
}