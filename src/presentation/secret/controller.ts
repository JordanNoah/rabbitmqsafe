import { Request, Response } from 'express'
import {SecretRepository} from "../../domain/repositories/secret.repository";

export class SecretController {
    constructor(
        private readonly secretRepository: SecretRepository
    ) {}

    encrypt = async (req: Request, res: Response) => {
        try {
            const encryptObj:{[key: string]:string;} = {}

            for (const key in req.body) {
                if (req.body.hasOwnProperty(key)){
                    encryptObj[key] = await this.secretRepository.encrypt(req.body[key])
                }
            }

            res.json(encryptObj)
        }catch (error){
            res.status(500).json(error)
        }
    }

    desEncrypt = async (req: Request, res: Response) => {
        try {
            const desEncryptObj:{[key: string]:string;} = {}

            for (const key in req.body){
                if (req.body.hasOwnProperty(key)){
                    desEncryptObj[key] = await this.secretRepository.desEncrypt(req.body[key])
                }
            }
            res.json(desEncryptObj)
        }catch (error){
            res.status(500).json(error)
        }
    }
}