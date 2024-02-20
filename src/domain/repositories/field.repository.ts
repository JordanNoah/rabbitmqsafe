import {FieldsRabbitEventDto} from "../dtos/rabbit-event/fields-rabbit-event.dto";
import {FieldsEntity} from "../entities/fields.entity";

export abstract class FieldRepository {
    abstract register(fieldsRabbitEventDto: FieldsRabbitEventDto): Promise<FieldsEntity>
    abstract findByPk(id: number): Promise<FieldsEntity | null>
}