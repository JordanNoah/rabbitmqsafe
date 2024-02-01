import express, { Router } from 'express'
import http from 'http'
import { DbSequelize } from "../infrastructure/database/init";
import {Rabbitmq} from "../infrastructure/eventBus/rabbitmq";
import {SequelizeField} from "../infrastructure/database/models/Fields";
import {SequelizeEvent} from "../infrastructure/database/models/Events";
import {SequelizeProperty} from "../infrastructure/database/models/Properties";
import {SequelizeSignature} from "../infrastructure/database/models/Signatures";

interface Options {
    port?: number
    routes: Router
}

export class Server {
    public readonly app = express()
    private readonly port: number
    private readonly routes: Router

    constructor(options: Options){
        const {port = 3030, routes} = options
        this.port = port
        this.routes = routes
    }

    start(){
        DbSequelize()
            .then(async ()=> {

                await Rabbitmq.init()

                const server = http.createServer(this.app)


                await SequelizeField.sync({force:true})
                await SequelizeProperty.sync({force:true})
                await SequelizeEvent.sync({force:true})
                await SequelizeSignature.sync({force:true})


                SequelizeField.belongsTo(SequelizeEvent, { as: 'event', foreignKey: 'eventId' });
                SequelizeProperty.belongsTo(SequelizeEvent, { as: 'event', foreignKey: 'eventId' });

                this.app.use(express.json())
                this.app.use(this.routes)
                this.app.use('/static/js',express.static("src/presentation/public/js"))

                server.listen(this.port,() => {
                    console.log(`Server running on PORT: ${this.port}`);
                })

            }).catch((err) => {
                console.error(err.message)
            })
    }
}