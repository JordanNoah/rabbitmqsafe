import {Request,Response} from "express"
import {RabbitRepository} from "../../domain/repositories/rabbit.repository";
import {RabbitSendDto} from "../../domain/dtos/rabbit-event/rabbit-send.dto";

export class RabbitController {

    constructor(
        private readonly rabbitRepository:RabbitRepository
    ) {}

    publish = (req: Request, res: Response) => {
        const [error, rabbitSendDto] = RabbitSendDto.create(req.body)
        if (error) return res.status(400).json({error})
        this.rabbitRepository.sendToRabbit(rabbitSendDto!).then((rabbitEvent) => {
            res.send(rabbitEvent)
        }).catch((error) => {
            res.status(500).json(error)
        })
    }

}