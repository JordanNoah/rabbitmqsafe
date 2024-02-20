import {FieldDatasource, FieldsEntity, FieldsRabbitEventDto} from "../../domain";
import {CustomError} from "../../domain/errors/custom.error";
import {SequelizeField} from "../database/models/Fields";

export class FieldDatasourceImpl implements FieldDatasource {
    async register(fieldsRabbitEventDto: FieldsRabbitEventDto): Promise<FieldsEntity> {
        try {
            return await SequelizeField.create({
                routingKey: fieldsRabbitEventDto.routingKey,
                consumerTag: fieldsRabbitEventDto.consumerTag,
                exchange: fieldsRabbitEventDto.exchange,
                deliveryTag: fieldsRabbitEventDto.deliveryTag,
                redelivered: fieldsRabbitEventDto.redelivered
            })
        }catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever()
        }
    }

    async findByPk(id: number): Promise<FieldsEntity | null> {
        try {
            return await SequelizeField.findByPk(id)
        }catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever()
        }
    }
}