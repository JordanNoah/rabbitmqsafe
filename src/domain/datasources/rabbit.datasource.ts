import {RabbitSendDto} from "../dtos/rabbit-event/rabbit-send.dto";
import {EventEntity} from "../entities/event.entity";

export abstract class RabbitDatasource {
    abstract sendToRabbit(rabbitSendConfigDto: RabbitSendDto): Promise<EventEntity>
}