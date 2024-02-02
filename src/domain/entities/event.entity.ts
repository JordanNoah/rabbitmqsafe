import {PropertiesEntity} from "./properties.entity";
import {FieldsEntity} from "./fields.entity";

export class EventEntity {
    constructor(
        public id: number,
        public fieldId: number,
        public propertyId: number,
        public content: string | null,
        public createdAt: Date,
        public updatedAt: Date
    ) {}
}