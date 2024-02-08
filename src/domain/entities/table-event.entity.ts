import {EventEntity} from "./event.entity";

export class TableEventEntity {
    constructor(
        public totalEvents: number,
        public events: EventEntity[]
    ) {}
}