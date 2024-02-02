import { Request, Response } from "express"
import {EventRepository, ReceivedRabbitEventDto} from "../../domain";

export class EventController {
    constructor(
        private readonly eventRepository:EventRepository
    ) {}

    createEvent = (req: Request, res: Response) => {
        const [error, receivedRabbitEventDto] = ReceivedRabbitEventDto.create(req.body)
        if (error) return res.status(400).json({error})
        this.eventRepository.register(receivedRabbitEventDto!).then((event)=> {
            res.json(event)
        }).catch((error) => {
            res.status(500).json(error)
        })
    }
}