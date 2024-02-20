import {EventDatasource, EventEntity, FieldsEntity, PropertiesEntity, ReceivedRabbitEventDto} from "../../domain";
import {CustomError} from "../../domain/errors/custom.error";
import {SequelizeEvent} from "../database/models/Events";
import {SequelizeProperty} from "../database/models/Properties";
import {SequelizeField} from "../database/models/Fields";
import {sequelize} from "../database/sequelize";
import {FieldDatasourceImpl} from "./field.datasource.impl";
import {PropertyDatasourceImpl} from "./property.datasource.impl";
import {SignatureDatasourceImpl} from "./signature.datasource.impl";
import {TableDto} from "../../domain/dtos/client/table.dto";
import {TableEventEntity} from "../../domain/entities/table-event.entity";
import * as crypto from "crypto";

export class EventDatasourceImpl implements EventDatasource {
    async register(receivedRabbitEventDto: ReceivedRabbitEventDto): Promise<EventEntity> {
        try {

            const { fields, content, properties } = receivedRabbitEventDto

            const signatureDatasourceImpl = new SignatureDatasourceImpl()

            const totalSignatures = await signatureDatasourceImpl.totalSignatures()

            if(totalSignatures > 0){
                const allowedSignature = await signatureDatasourceImpl.existSignature(properties.type)
                if(!allowedSignature) throw CustomError.badRequest('Signature not allowed')
            }

            const field = await new FieldDatasourceImpl().register(fields)

            const property = await new PropertyDatasourceImpl().register(properties)

            const event = await SequelizeEvent.create({
                uuid:crypto.randomUUID(),
                content:content,
                fieldId:field.id,
                propertyId:property.id
            })

            const eventEntity = await this.getById(event.id)

            if (!eventEntity) throw CustomError.notFound('Event not found')

            return eventEntity
        }catch (error) {
            if (error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalSever()
        }
    }

    async getById(id: number): Promise<EventEntity | null> {
        try {

            const fieldDatasourceImpl = new FieldDatasourceImpl()
            const propertyDatasourceImpl = new PropertyDatasourceImpl()

            const sequelizeEvent = await SequelizeEvent.findByPk(id,{
                include:[
                    {
                        model:SequelizeField,
                        as:'field'
                    },
                    {
                        model:SequelizeProperty,
                        as:'property'
                    }
                ]
            })

            if (!sequelizeEvent) return null

            const sequelizeField = fieldDatasourceImpl.findByPk(sequelizeEvent.fieldId)
            const seq = propertyDatasourceImpl.

            return new EventEntity(
                sequelizeEvent.id,
                sequelizeEvent.uuid,
                sequelizeEvent.fieldId,
                sequelizeEvent.propertyId,
                sequelizeEvent.content,
                {},
                {},
                sequelizeEvent.createdAt,
                sequelizeEvent.updatedAt
            )
        }catch (error) {
            if (error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalSever()
        }
    }

    async getByUuid(uuid: string): Promise<EventEntity | null> {
        try {
            return await SequelizeEvent.findOne({
                include:[
                    {
                        model:SequelizeField,
                        as:'field'
                    },
                    {
                        model:SequelizeProperty,
                        as:'property'
                    }
                ],
                where:{
                    uuid:uuid
                }
            })
        }catch (error) {
            if (error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalSever()
        }
    }

    async getAll(): Promise<EventEntity[]> {
        try {
            return await SequelizeEvent.findAll({
                include:[
                    {
                        model:SequelizeField,
                        as:'field'
                    },
                    {
                        model:SequelizeProperty,
                        as:'property'
                    }
                ]
            })
        }catch (error) {
            if (error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalSever()
        }
    }

    async getLimited(tableDto: TableDto): Promise<TableEventEntity> {
        try {
            const { count ,rows} = await SequelizeEvent.findAndCountAll({
                include:[
                    {
                        model:SequelizeField,
                        as:'field'
                    },
                    {
                        model:SequelizeProperty,
                        as:'property'
                    }
                ],
                limit:tableDto.limit,
                offset:tableDto.page * tableDto.limit
            })

            return new TableEventEntity(
                count,
                rows
            )
        }catch (error){
            if (error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalSever()
        }
    }
}