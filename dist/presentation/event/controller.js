"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventController = void 0;
const domain_1 = require("../../domain");
const table_dto_1 = require("../../domain/dtos/client/table.dto");
const filters_table_dto_1 = require("../../domain/dtos/client/filters-table.dto");
class EventController {
    constructor(eventRepository) {
        this.eventRepository = eventRepository;
        this.createEvent = (req, res) => {
            const [error, receivedRabbitEventDto] = domain_1.ReceivedRabbitEventDto.create(req.body);
            if (error)
                return res.status(400).json({ error });
            this.eventRepository.register(receivedRabbitEventDto).then((event) => {
                res.json(event);
            }).catch((error) => {
                res.status(500).json(error);
            });
        };
        this.getById = (req, res) => {
            this.eventRepository.getById(Number(req.params.id)).then((event) => {
                res.json(event);
            }).catch((error) => {
                res.status(500).json(error);
            });
        };
        this.getAll = (req, res) => {
            this.eventRepository.getAll().then((events) => {
                res.json(events);
            }).catch((error) => {
                res.status(500).json(error);
            });
        };
        this.getLimited = (req, res) => {
            const [error, tableDto] = table_dto_1.TableDto.create(req.body);
            if (error)
                return res.status(400).json({ error });
            this.eventRepository.getLimited(tableDto).then((events) => {
                res.json(events);
            }).catch((error) => {
                res.status(500).json(error);
            });
        };
        this.getByFilters = (req, res) => {
            const [error, filtersTableDto] = filters_table_dto_1.FiltersTableDto.create(req.body);
            if (error)
                return res.status(400).json({ error });
            this.eventRepository.getByFilters(filtersTableDto).then((events) => {
                res.json(events);
            }).catch((error) => {
                res.status(500).json(error);
            });
        };
    }
}
exports.EventController = EventController;
