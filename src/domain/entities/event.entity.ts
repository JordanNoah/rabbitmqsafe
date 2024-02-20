import {PropertiesEntity} from "./properties.entity";
import {FieldsEntity} from "./fields.entity";

export class EventEntity {
    constructor(
        public id: number,
        public uuid: string,
        public fieldId: number,
        public propertyId: number,
        public content: string | null,
        public field: FieldsEntity,
        public property: PropertiesEntity,
        public createdAt: Date,
        public updatedAt: Date
    ) {}
}