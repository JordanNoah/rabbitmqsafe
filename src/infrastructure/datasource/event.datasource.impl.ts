import {EventDatasource, EventEntity, FieldsEntity, PropertiesEntity, ReceivedRabbitEventDto} from "../../domain";
import {CustomError} from "../../domain/errors/custom.error";
import {SequelizeEvent} from "../database/models/Events";
import {SequelizeProperty} from "../database/models/Properties";
import {SequelizeField} from "../database/models/Fields";
import {sequelize} from "../database/sequelize";
import {FieldDatasourceImpl} from "./field.datasource.impl";
import {PropertyDatasourceImpl} from "./property.datasource.impl";
import {SignatureDatasourceImpl} from "./signature.datasource.impl";

export class EventDatasourceImpl implements EventDatasource {
    async register(receivedRabbitEventDto: ReceivedRabbitEventDto): Promise<EventEntity> {
        try {

            const { fields, content, properties } = receivedRabbitEventDto

            const allowedSignature = await new SignatureDatasourceImpl().existSignature(properties.type)

            if(!allowedSignature) throw CustomError.badRequest('Signature not allowed')

            const field = await new FieldDatasourceImpl().register(fields)

            const property = await new PropertyDatasourceImpl().register(properties)

            const event = await SequelizeEvent.create({
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
            return await SequelizeEvent.findByPk(id,{
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
}