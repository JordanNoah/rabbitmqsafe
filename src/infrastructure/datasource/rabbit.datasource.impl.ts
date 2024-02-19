import {RabbitDatasource} from "../../domain/datasources/rabbit.datasource";
import {RabbitSendDto} from "../../domain/dtos/rabbit-event/rabbit-send.dto";
import {EventEntity} from "../../domain";
import {CustomError} from "../../domain/errors/custom.error";

export class RabbitDatasourceImpl implements RabbitDatasource {
    async sendToRabbit(rabbitSendConfigDto: RabbitSendDto): Promise<EventEntity> {
        try {
            
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever()
        }
    }
}