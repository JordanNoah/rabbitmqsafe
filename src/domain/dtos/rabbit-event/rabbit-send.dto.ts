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
            rabbit_username,
            rabbit_password,
            rabbit_protocol,
            rabbit_hostname,
            rabbit_port,
            rabbit_vhost,
            rabbit_queue,
            rabbit_exchange,
            rabbit_routingKey,
            rabbit_sendType,
            uuid_event
        } = object

        return [
            undefined,
            new RabbitSendDto(
                rabbit_username,
                rabbit_password,
                rabbit_protocol,
                rabbit_hostname,
                rabbit_port,
                rabbit_vhost,
                rabbit_queue,
                rabbit_exchange,
                rabbit_routingKey,
                rabbit_sendType,
                uuid_event
            )
        ]
    }
}