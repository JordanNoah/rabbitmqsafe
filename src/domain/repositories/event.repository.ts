import {ReceivedRabbitEventDto} from "../dtos/rabbit-event/received-rabbit-event.dto";
import {EventEntity} from "../entities/event.entity";

export abstract class EventRepository {
    abstract register(receivedRabbitEventDto: ReceivedRabbitEventDto): Promise<EventEntity>
}