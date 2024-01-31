import {FieldDatasource, FieldRepository, FieldsEntity, FieldsRabbitEventDto} from "../../domain";

export class FieldRepositoryImpl implements FieldRepository {
    constructor(
        private readonly fieldDatasource: FieldDatasource
    ) {}

    register(fieldsRabbitEventDto: FieldsRabbitEventDto): Promise<FieldsEntity> {
        return this.fieldDatasource.register(fieldsRabbitEventDto)
    }
}