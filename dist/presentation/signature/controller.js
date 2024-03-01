"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignatureController = void 0;
const domain_1 = require("../../domain");
class SignatureController {
    constructor(signatureRepository) {
        this.signatureRepository = signatureRepository;
        this.createSignature = (req, res) => {
            const [error, registerSignatureDto] = domain_1.RegisterSignatureDto.create(req.body);
            if (error)
                return res.status(400).json({ error });
            this.signatureRepository.register(registerSignatureDto).then((signature) => {
                res.json(signature);
            }).catch((error) => {
                res.status(500).json(error);
            });
        };
        this.getById = (req, res) => {
            this.signatureRepository.getById(Number(req.params.id)).then((signature) => {
                res.json(signature);
            }).catch((error) => {
                res.status(500).json(error);
            });
        };
        this.getAll = (req, res) => {
            this.signatureRepository.getAll().then((signatures) => {
                res.json(signatures);
            }).catch((error) => {
                res.status(500).json(error);
            });
        };
        this.deleteById = (req, res) => {
            this.signatureRepository.deleteById(Number(req.params.id)).then((signature) => {
                res.json(signature);
            }).catch((error) => {
                res.status(500).json(error);
            });
        };
        this.deleteByUuid = (req, res) => {
            this.signatureRepository.deleteByUuid(req.params.uuid).then((signature) => {
                res.json(signature);
            }).catch((error) => {
                res.status(500).json(error);
            });
        };
        this.update = (req, res) => {
            const [error, registerSignatureDto] = domain_1.RegisterSignatureDto.create(req.body);
            if (error)
                return res.status(400).json({ error });
            this.signatureRepository.update(registerSignatureDto).then((signature) => {
                res.json(signature);
            }).catch((error) => {
                res.status(500).json(error);
            });
        };
        this.getByUuid = (req, res) => {
            this.signatureRepository.getByUuid(req.params.uuid).then((signature) => {
                res.json(signature);
            }).catch((error) => {
                res.status(500).json(error);
            });
        };
        this.setOnSignature = (req, res) => {
            this.signatureRepository.setOnSignature(req.params.uuid).then((signature) => {
                res.json(signature);
            }).catch((error) => {
                res.status(500).json(error);
            });
        };
        this.setOffSignature = (req, res) => {
            this.signatureRepository.setOffSignature(req.params.uuid).then((signature) => {
                res.json(signature);
            }).catch((error) => {
                res.status(500).json(error);
            });
        };
    }
}
exports.SignatureController = SignatureController;
