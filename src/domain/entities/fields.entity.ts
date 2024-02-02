export class FieldsEntity {
    constructor(
        public id: number,
        public consumerTag: string | null,
        public deliveryTag: string | null,
        public redelivered: boolean,
        public exchange: string | null,
        public routingKey: string | null,
        public createdAt: Date,
        public updatedAt: Date
    ) {}
}