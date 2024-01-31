export class FieldsEntity {
    constructor(
        public id: number,
        public consumerTag: string,
        public deliveryTag: string,
        public redelivered: boolean,
        public exchange: string,
        public routingKey: string,
        public createdAt: Date,
        public updatedAt: Date
    ) {}
}