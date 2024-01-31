import {FieldDatasource, FieldsEntity, FieldsRabbitEventDto} from "../../domain";
import {CustomError} from "../../domain/errors/custom.error";

export class FieldDatasourceImpl implements FieldDatasource {
    async register(fieldsRabbitEventDto: FieldsRabbitEventDto): Promise<FieldsEntity> {
        try {
            return new FieldsEntity(
                1,
                '',
                '',
                true,
                '',
                '',
                new Date(),
                new Date()
            )
        }catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever()
        }
    }
}