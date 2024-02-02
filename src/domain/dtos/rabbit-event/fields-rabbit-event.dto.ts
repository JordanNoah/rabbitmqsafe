export class FieldsRabbitEventDto {
    private constructor(
        public consumerTag: string,
        public deliveryTag: string,
        public redelivered: boolean,
        public exchange: string,
        public routingKey: string
    ){}

    static create(object:{[key:string]:any}):[string?,FieldsRabbitEventDto?]{
        const {
            consumerTag,
            deliveryTag,
            redelivered,
            exchange,
            routingKey
        } = object

        return [
            undefined,
            new FieldsRabbitEventDto(
                consumerTag,
                deliveryTag,
                redelivered,
                exchange,
                routingKey
            )
        ]
    }
}