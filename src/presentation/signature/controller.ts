import { Request, Response } from 'express'
import { SignatureRepository, RegisterSignatureDto } from '../../domain'
export class SignatureController {
    constructor(
        private readonly signatureRepository:SignatureRepository
    ) {}

    createSignature = (req: Request, res: Response) => {
        const [error,registerSignatureDto] = RegisterSignatureDto.create(req.body)
        if (error) return res.status(400).json({error})
        this.signatureRepository.register(registerSignatureDto!).then((signature) => {
            res.json(signature)
        }).catch((error) => {
            res.status(500).json(error)
        })
    }

    getById = (req: Request, res: Response) => {
        this.signatureRepository.getById(Number(req.params.id)).then((signature) => {
            res.json(signature)
        }).catch((error) => {
            res.status(500).json(error)
        })
    }

    getAll = (req: Request, res: Response) => {
        this.signatureRepository.getAll().then((signatures) => {
            res.json(signatures)
        }).catch((error) => {
            res.status(500).json(error)
        })
    }

    deleteById = (req: Request, res: Response) => {
        this.signatureRepository.deleteById(Number(req.params.id)).then((signature) => {
            res.json(signature)
        }).catch((error) => {
            res.status(500).json(error)
        })
    }

    update = (req: Request, res: Response) => {
        const [error, registerSignatureDto] = RegisterSignatureDto.create(req.body)
        if (error) return res.status(400).json({error})

        this.signatureRepository.update(registerSignatureDto!).then((signature) => {
            res.json(signature)
        }).catch((error) => {
            res.status(500).json(error)
        })
    }

    getByUuid = (req: Request, res: Response) => {
        this.signatureRepository.getByUuid(req.params.uuid).then((signature) => {
            res.json(signature)
        }).catch((error) => {
            res.status(500).json(error)
        })
    }
}