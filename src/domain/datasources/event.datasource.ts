import {ReceivedRabbitEventDto} from "../dtos/rabbit-event/received-rabbit-event.dto";
import {EventEntity} from "../entities/event.entity";
import {TableDto} from "../dtos/client/table.dto";
import {TableEventEntity} from "../entities/table-event.entity";

export abstract class EventDatasource {
    abstract register(receivedRabbitEventDto: ReceivedRabbitEventDto): Promise<EventEntity>
    abstract getById(id: number): Promise<EventEntity | null>
    abstract getByUuid(uuid: string): Promise<EventEntity | null>
    abstract getAll(): Promise<EventEntity[]>
    abstract getLimited(tableDto: TableDto): Promise<TableEventEntity>
}