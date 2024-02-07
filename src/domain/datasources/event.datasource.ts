import {ReceivedRabbitEventDto} from "../dtos/rabbit-event/received-rabbit-event.dto";
import {EventEntity} from "../entities/event.entity";

export abstract class EventDatasource {
    abstract register(receivedRabbitEventDto: ReceivedRabbitEventDto): Promise<EventEntity>
    abstract getById(id: number): Promise<EventEntity|null>
    abstract getAll(): Promise<EventEntity[]>
}