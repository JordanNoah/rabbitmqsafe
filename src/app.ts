import { AppRoutes } from "./presentation/routes"
import { Server } from "./presentation/server"

(()=>{
    main()
})()

function main() {
    new Server({routes:AppRoutes.routes}).start()
}