import { Request, Response } from "express"
import {EventRepository, ReceivedRabbitEventDto} from "../../domain";
import {TableDto} from "../../domain/dtos/client/table.dto";
import {FiltersTableDto} from "../../domain/dtos/client/filters-table.dto";

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

    getById = (req: Request, res: Response) => {
        this.eventRepository.getById(Number(req.params.id)).then((event) => {
            res.json(event)
        }).catch((error) => {
            res.status(500).json(error)
        })
    }

    getAll = (req: Request, res: Response) => {
        this.eventRepository.getAll().then((events) => {
            res.json(events)
        }).catch((error) => {
            res.status(500).json(error)
        })
    }

    getLimited = (req: Request, res: Response) => {
        const [error, tableDto] = TableDto.create(req.body)
        if (error) return res.status(400).json({error})
        this.eventRepository.getLimited(tableDto!).then((events) => {
            res.json(events)
        }).catch((error) => {
            res.status(500).json(error)
        })
    }

    getByFilters = (req: Request, res: Response) => {
        const [error, filtersTableDto] = FiltersTableDto.create(req.body)
        if(error) return res.status(400).json({error})
        this.eventRepository.getByFilters(filtersTableDto!).then((events) => {
            res.json(events)
        }).catch((error) => {
            res.status(500).json(error)
        })
    }
}