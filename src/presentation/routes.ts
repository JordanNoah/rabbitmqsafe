import { Router } from "express"
import path from "path";
import {SignatureRoutes} from "./signature/routes";
import {EventRoutes} from "./event/routes";

export class AppRoutes {
    static get routes(): Router {
        const router = Router()
            router.get('/',(req,res) => {
                res.sendFile(path.join(__dirname,'./public/index.html'))
            })

            router.use('/api/signature', SignatureRoutes.routes)
            router.use('/api/event', EventRoutes.routes)
        return router
    }
}