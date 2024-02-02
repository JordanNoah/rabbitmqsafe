import {EventDatasource, EventEntity, FieldsEntity, PropertiesEntity, ReceivedRabbitEventDto} from "../../domain";
import {CustomError} from "../../domain/errors/custom.error";
import {SequelizeEvent} from "../database/models/Events";
import {SequelizeProperty} from "../database/models/Properties";
import {SequelizeField} from "../database/models/Fields";
import {sequelize} from "../database/sequelize";

export class EventDatasourceImpl implements EventDatasource {
    async register(receivedRabbitEventDto: ReceivedRabbitEventDto): Promise<EventEntity> {
        try {
            const { fields, content, properties } = receivedRabbitEventDto
            const t = await sequelize.transaction();

            const field = await SequelizeField.create()
            const property = await SequelizeProperty.create()
            await SequelizeEvent.create({
                content:content
            })

            return new EventEntity(
                1,
                property,
                field,
                '',
                new Date(),
                new Date()
            )
        }catch (error) {
            if (error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalSever()
        }
    }
}