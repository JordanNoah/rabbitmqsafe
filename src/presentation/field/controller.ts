import { Request, Response } from 'express'
import {FieldRepository, FieldsRabbitEventDto} from "../../domain";

export class FieldController {
    constructor(
        private readonly fieldRepository:FieldRepository
    ) {}

    createField = (req: Request, res: Response) => {
        const [error, fieldRabbitEventDto] = FieldsRabbitEventDto.create(req.body)
        if (error) return res.status(400).json({error})
        this.fieldRepository.register(fieldRabbitEventDto!).then((field) => {
            res.json(field)
        }).catch((error) => {
            res.status(500).json(error)
        })
    }
}