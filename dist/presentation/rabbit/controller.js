"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RabbitController = void 0;
const rabbit_send_dto_1 = require("../../domain/dtos/rabbit-event/rabbit-send.dto");
class RabbitController {
    constructor(rabbitRepository) {
        this.rabbitRepository = rabbitRepository;
        this.publish = (req, res) => {
            const [error, rabbitSendDto] = rabbit_send_dto_1.RabbitSendDto.create(req.body);
            if (error)
                return res.status(400).json({ error });
            this.rabbitRepository.sendToRabbit(rabbitSendDto).then((rabbitEvent) => {
                res.send(rabbitEvent);
            }).catch((error) => {
                res.status(500).json(error);
            });
        };
    }
}
exports.RabbitController = RabbitController;
