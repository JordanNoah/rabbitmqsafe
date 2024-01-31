import {PropertiesEntity} from "./properties.entity";
import {FieldsEntity} from "./fields.entity";

export class EventEntity {
    constructor(
        public id: number,
        public property: PropertiesEntity,
        public field: FieldsEntity,
        public content: string,
        public createdAt: Date,
        public updatedAt: Date
    ) {}
}