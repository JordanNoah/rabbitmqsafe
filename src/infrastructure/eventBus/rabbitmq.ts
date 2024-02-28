import { Connection, Channel, connect, ConsumeMessage } from "amqplib"
import { config, assertQueue, assertExchange ,eventList } from "./config"
import AppConfig from "../../domain/config";
import {ReceivedRabbitEventDto} from "../../domain";
import {throws} from "node:assert";
import {CustomError} from "../../domain/errors/custom.error";
import {EventDatasourceImpl} from "../datasource/event.datasource.impl";
import {EventRepositoryImpl} from "../repositories/event.repository.impl";
import {SocketManager} from "../socket/io";

export class Rabbitmq {

    private static _connection: Connection;
    private static _channel: Channel;

    public static async connection() {
        this._connection = await connect(config);
        this._channel = await this._connection.createConfirmChannel();
    }

    public static async setQueue() {
        await this._channel.assertQueue(
            AppConfig.RABBIT_QUEUE,
            assertQueue
        )

        await this._channel.assertExchange(
            AppConfig.RABBIT_EXCHANGE,
            AppConfig.RABBIT_TYPE_EXCHANGE,
            assertExchange
        )

        await this._channel.bindQueue(
            AppConfig.RABBIT_QUEUE,
            AppConfig.RABBIT_EXCHANGE,
            AppConfig.RABBIT_ROUTING_KEY
        )
        await this._channel.prefetch(1);
    }

    public static async consume(){
        await this._channel.consume(
            AppConfig.RABBIT_QUEUE,
            async (msg) => {
                try {
                    SocketManager.emit('isSyncRabbit',{sync:true})

                    const datasource = new EventDatasourceImpl()
                    const eventRepository = new EventRepositoryImpl(datasource)

                    const [error, receivedRabbitEventDto] = ReceivedRabbitEventDto.create(msg!)
                    if (error) throw CustomError.internalSever('error')
                    eventRepository.register(receivedRabbitEventDto!).then((event)=> {
                        console.log("Event consumed")
                        this._channel.ack(msg!);
                    }).catch((error) => {
                        console.log(error)
                        console.log("Event ignored")
                    }).finally(()=>{
                        SocketManager.emit('isSyncRabbit',{sync:false})
                    })
                }catch (error){
                    if (error instanceof CustomError){
                        throw error;
                    }
                    throw CustomError.internalSever()
                }
            }
        )
    }

    public static async init() {
        await this.connection()
        await this.setQueue()
        await this.consume()
    }
}