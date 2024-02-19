export class RabbitSendDto {
    private constructor(
        public username: string,
        public password: string,
        public protocol: string,
        public hostname: string,
        public port: number,
        public vhost: string,
        public queue: string,
        public exchange: string,
        public routingKey: string,
        public sendType: string,
        public uuidEvent: string
    ){}

    static create(object:{[key:string]:any}):[string?,RabbitSendDto?]{
        const {
            username,
            password,
            protocol,
            hostname,
            port,
            vhost,
            queue,
            exchange,
            routingKey,
            sendType,
            uuidEvent
        } = object

        return [
            undefined,
            new RabbitSendDto(
                username,
                password,
                protocol,
                hostname,
                port,
                vhost,
                queue,
                exchange,
                routingKey,
                sendType,
                uuidEvent
            )
        ]
    }
}