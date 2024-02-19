import {RabbitRepository} from "../../domain/repositories/rabbit.repository";
import {RabbitDatasource} from "../../domain/datasources/rabbit.datasource";
import {RabbitSendDto} from "../../domain/dtos/rabbit-event/rabbit-send.dto";
import {EventEntity} from "../../domain";

export class RabbitRepositoryImpl implements RabbitRepository {
    constructor(
        private readonly rabbitDatasource: RabbitDatasource
    ) {}

    sendToRabbit(rabbitSendConfigDto: RabbitSendDto): Promise<EventEntity> {
        return this.rabbitDatasource.sendToRabbit(rabbitSendConfigDto)
    }
}