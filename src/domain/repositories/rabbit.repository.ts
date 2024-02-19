import {RabbitSendDto} from "../dtos/rabbit-event/rabbit-send.dto";
import {EventEntity} from "../entities/event.entity";

export abstract class RabbitRepository {
    abstract sendToRabbit(rabbitSendConfigDto: RabbitSendDto): Promise<EventEntity>
}