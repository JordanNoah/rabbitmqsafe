"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldController = void 0;
const domain_1 = require("../../domain");
class FieldController {
    constructor(fieldRepository) {
        this.fieldRepository = fieldRepository;
        this.createField = (req, res) => {
            const [error, fieldRabbitEventDto] = domain_1.FieldsRabbitEventDto.create(req.body);
            if (error)
                return res.status(400).json({ error });
            this.fieldRepository.register(fieldRabbitEventDto).then((field) => {
                res.json(field);
            }).catch((error) => {
                res.status(500).json(error);
            });
        };
    }
}
exports.FieldController = FieldController;
