import {EventDatasource, EventEntity, EventRepository, ReceivedRabbitEventDto} from "../../domain";

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
}