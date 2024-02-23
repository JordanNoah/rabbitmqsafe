import {RabbitDatasource} from "../../domain/datasources/rabbit.datasource";
import {RabbitSendDto} from "../../domain/dtos/rabbit-event/rabbit-send.dto";
import {EventEntity} from "../../domain";
import {CustomError} from "../../domain/errors/custom.error";
import {SecretDatasourceImpl} from "./secret.datasource.impl";
import {Connection, Channel, connect, ConsumeMessage, Options as RabbitOpt} from "amqplib"
import {EventDatasourceImpl} from "./event.datasource.impl";

export class RabbitDatasourceImpl implements RabbitDatasource {
    async sendToRabbit(rabbitSendConfigDto: RabbitSendDto): Promise<EventEntity> {
        try {

            const secretDatasourceImpl = new SecretDatasourceImpl()
            const eventDatasourceImpl = new EventDatasourceImpl()

            let rabbitConfig:{[key: string]: any;} = {
                username: await secretDatasourceImpl.desEncrypt(rabbitSendConfigDto.username),
                password: await secretDatasourceImpl.desEncrypt(rabbitSendConfigDto.password),
                protocol: await secretDatasourceImpl.desEncrypt(rabbitSendConfigDto.protocol),
                hostname: await secretDatasourceImpl.desEncrypt(rabbitSendConfigDto.hostname),
                port: await secretDatasourceImpl.desEncrypt(String(rabbitSendConfigDto.port)),
                vhost: await secretDatasourceImpl.desEncrypt(rabbitSendConfigDto.vhost),
                queue: await secretDatasourceImpl.desEncrypt(rabbitSendConfigDto.queue),
                exchange: await secretDatasourceImpl.desEncrypt(rabbitSendConfigDto.exchange),
                routingKey: await secretDatasourceImpl.desEncrypt(rabbitSendConfigDto.routingKey),
                sendType: await secretDatasourceImpl.desEncrypt(rabbitSendConfigDto.sendType)
            }

            const eventToPublish = await eventDatasourceImpl.getByUuid(rabbitSendConfigDto.uuidEvent)

            if(!eventToPublish) throw CustomError.notFound('Event not found')

            const configRabbit: RabbitOpt.Connect = {
                username: rabbitConfig.username,
                password: rabbitConfig.password,
                protocol: rabbitConfig.protocol,
                hostname: rabbitConfig.hostname,
                port: parseInt(rabbitConfig.port),
                vhost: rabbitConfig.vhost
            }

            const options: RabbitOpt.Publish = {
                appId:eventToPublish.property.appId,
                type:eventToPublish.property.type,
                timestamp:eventToPublish.property.timestamp,
                messageId:eventToPublish.property.messageId,
                deliveryMode:eventToPublish.property.deliveryMode,
                contentType:eventToPublish.property.contentType
            }

            const rabbitConnection = await connect(configRabbit)
            const channel = await rabbitConnection.createConfirmChannel()
            const queue = await channel.assertQueue(rabbitConfig.queue,{durable:true})

            if(rabbitConfig.sendType === "exclusive"){
                channel.sendToQueue(
                    queue.queue,
                    Buffer.from(eventToPublish.content ?? ''),
                    options,
                    (err, ok) => {
                        if(err){
                            throw CustomError.internalSever(err)
                        }
                    }
                )
            } else {
                const exchange = await channel.assertExchange(rabbitConfig.exchange, 'fanout')
                await channel.bindQueue(rabbitConfig.queue, exchange.exchange, rabbitConfig.routingKey)
                channel.publish(
                    exchange.exchange,
                    rabbitConfig.routingKey,
                    Buffer.from(eventToPublish.content ?? ''),
                    options,
                    (err, ok) => {
                        if(err){
                            throw CustomError.internalSever(err)
                        }
                    }
                )
            }

            return eventToPublish
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever()
        }
    }
}