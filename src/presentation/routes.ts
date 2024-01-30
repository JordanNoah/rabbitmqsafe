import { Router } from "express"
import path from "path";
import {SignatureRoutes} from "./signature/routes";

export class AppRoutes {
    static get routes(): Router {
        const router = Router()
            router.get('/',(req,res) => {
                res.sendFile(path.join(__dirname,'./public/index.html'))
            })

            router.use('/api/signature', SignatureRoutes.routes)
        return router
    }
}