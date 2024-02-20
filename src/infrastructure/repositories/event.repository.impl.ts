import {EventDatasource, EventEntity, EventRepository, ReceivedRabbitEventDto} from "../../domain";
import {TableDto} from "../../domain/dtos/client/table.dto";
import {TableEventEntity} from "../../domain/entities/table-event.entity";

export class EventRepositoryImpl implements EventRepository{
    constructor(
        private readonly eventDatasource: EventDatasource
    ) {}

    register(receivedRabbitEventDto: ReceivedRabbitEventDto): Promise<EventEntity> {
        return this.eventDatasource.register(receivedRabbitEventDto)
    }

    getById(id: number): Promise<EventEntity | null> {
        return this.eventDatasource.getById(id)
    }

    getByUuid(uuid: string): Promise<EventEntity | null> {
        return this.eventDatasource.getByUuid(uuid)
    }

    getAll(): Promise<EventEntity[]> {
        return this.eventDatasource.getAll()
    }

    getLimited(tableDto: TableDto): Promise<TableEventEntity> {
        return this.eventDatasource.getLimited(tableDto)
    }
}