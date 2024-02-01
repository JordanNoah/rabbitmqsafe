import { Request, Response } from 'express'
import {FieldRepository} from "../../domain";

export class FieldController {
    constructor(
        private readonly fieldRepository:FieldRepository
    ) {}

    createField = (req: Request, res: Response) => {
        res.send("something")
    }
}