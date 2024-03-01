"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RabbitSendDto = void 0;
class RabbitSendDto {
    constructor(username, password, protocol, hostname, port, vhost, queue, exchange, routingKey, sendType, uuidEvent) {
        this.username = username;
        this.password = password;
        this.protocol = protocol;
        this.hostname = hostname;
        this.port = port;
        this.vhost = vhost;
        this.queue = queue;
        this.exchange = exchange;
        this.routingKey = routingKey;
        this.sendType = sendType;
        this.uuidEvent = uuidEvent;
    }
    static create(object) {
        const { rabbit_username, rabbit_password, rabbit_protocol, rabbit_hostname, rabbit_port, rabbit_vhost, rabbit_queue, rabbit_exchange, rabbit_routingKey, rabbit_sendType, uuid_event } = object;
        return [
            undefined,
            new RabbitSendDto(rabbit_username, rabbit_password, rabbit_protocol, rabbit_hostname, rabbit_port, rabbit_vhost, rabbit_queue, rabbit_exchange, rabbit_routingKey, rabbit_sendType, uuid_event)
        ];
    }
}
exports.RabbitSendDto = RabbitSendDto;
