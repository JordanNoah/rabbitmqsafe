"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventDatasourceImpl = void 0;
const custom_error_1 = require("../../domain/errors/custom.error");
const Events_1 = require("../database/models/Events");
const Properties_1 = require("../database/models/Properties");
const Fields_1 = require("../database/models/Fields");
const field_datasource_impl_1 = require("./field.datasource.impl");
const property_datasource_impl_1 = require("./property.datasource.impl");
const signature_datasource_impl_1 = require("./signature.datasource.impl");
const table_event_entity_1 = require("../../domain/entities/table-event.entity");
const crypto = __importStar(require("crypto"));
const sequelize_1 = require("sequelize");
class EventDatasourceImpl {
    register(receivedRabbitEventDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { fields, content, properties } = receivedRabbitEventDto;
                const signatureDatasourceImpl = new signature_datasource_impl_1.SignatureDatasourceImpl();
                const totalSignatures = yield signatureDatasourceImpl.totalSignatures();
                if (totalSignatures > 0) {
                    const allowedSignature = yield signatureDatasourceImpl.existSignature(properties.type);
                    if (!allowedSignature)
                        throw custom_error_1.CustomError.badRequest('Signature not allowed');
                }
                const field = yield new field_datasource_impl_1.FieldDatasourceImpl().register(fields);
                const property = yield new property_datasource_impl_1.PropertyDatasourceImpl().register(properties);
                const event = yield Events_1.SequelizeEvent.create({
                    uuid: crypto.randomUUID(),
                    content: content,
                    fieldId: field.id,
                    propertyId: property.id
                });
                const eventEntity = yield this.getById(event.id);
                if (!eventEntity)
                    throw custom_error_1.CustomError.notFound('Event not found');
                return eventEntity;
            }
            catch (error) {
                if (error instanceof custom_error_1.CustomError) {
                    throw error;
                }
                throw custom_error_1.CustomError.internalSever();
            }
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield Events_1.SequelizeEvent.findByPk(id, {
                    include: [
                        {
                            model: Fields_1.SequelizeField,
                            as: 'field'
                        },
                        {
                            model: Properties_1.SequelizeProperty,
                            as: 'property'
                        }
                    ]
                });
            }
            catch (error) {
                if (error instanceof custom_error_1.CustomError) {
                    throw error;
                }
                throw custom_error_1.CustomError.internalSever();
            }
        });
    }
    getByUuid(uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield Events_1.SequelizeEvent.findOne({
                    include: [
                        {
                            model: Fields_1.SequelizeField,
                            as: 'field'
                        },
                        {
                            model: Properties_1.SequelizeProperty,
                            as: 'property'
                        }
                    ],
                    where: {
                        uuid: uuid
                    }
                });
            }
            catch (error) {
                if (error instanceof custom_error_1.CustomError) {
                    throw error;
                }
                throw custom_error_1.CustomError.internalSever();
            }
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield Events_1.SequelizeEvent.findAll({
                    include: [
                        {
                            model: Fields_1.SequelizeField,
                            as: 'field'
                        },
                        {
                            model: Properties_1.SequelizeProperty,
                            as: 'property'
                        }
                    ]
                });
            }
            catch (error) {
                if (error instanceof custom_error_1.CustomError) {
                    throw error;
                }
                throw custom_error_1.CustomError.internalSever();
            }
        });
    }
    getLimited(tableDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const order = [tableDto.order.row, tableDto.order.desc ? 'DESC' : 'ASC'];
                const { count, rows } = yield Events_1.SequelizeEvent.findAndCountAll({
                    include: [
                        {
                            model: Fields_1.SequelizeField,
                            as: 'field'
                        },
                        {
                            model: Properties_1.SequelizeProperty,
                            as: 'property'
                        }
                    ],
                    limit: tableDto.limit,
                    offset: tableDto.page * tableDto.limit,
                    order: [order]
                });
                return new table_event_entity_1.TableEventEntity(count, rows);
            }
            catch (error) {
                if (error instanceof custom_error_1.CustomError) {
                    throw error;
                }
                throw custom_error_1.CustomError.internalSever();
            }
        });
    }
    getByFilters(filtersTableDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const eventWhereClause = {};
                const propertyWhereClause = {};
                const order = [filtersTableDto.tableConfig.order.row, filtersTableDto.tableConfig.order.desc ? 'DESC' : 'ASC'];
                filtersTableDto.filters.forEach((el) => {
                    if (el.filter.key == 'id') {
                        eventWhereClause[el.filter.key] = { [sequelize_1.Op.eq]: parseInt(el.text) };
                    }
                    if (el.filter.key == 'content') {
                        eventWhereClause[el.filter.key] = { [sequelize_1.Op.substring]: el.text };
                    }
                    if (el.filter.key == 'signature') {
                        propertyWhereClause["type"] = { [sequelize_1.Op.substring]: el.text };
                    }
                });
                const { count, rows } = yield Events_1.SequelizeEvent.findAndCountAll({
                    include: [
                        {
                            model: Fields_1.SequelizeField,
                            as: 'field'
                        },
                        {
                            model: Properties_1.SequelizeProperty,
                            as: 'property',
                            where: propertyWhereClause
                        }
                    ],
                    where: eventWhereClause,
                    limit: filtersTableDto.tableConfig.limit,
                    offset: filtersTableDto.tableConfig.page * filtersTableDto.tableConfig.limit,
                    order: [order]
                });
                return new table_event_entity_1.TableEventEntity(count, rows);
            }
            catch (error) {
                console.log("error filter: ", error);
                if (error instanceof custom_error_1.CustomError) {
                    throw error;
                }
                throw custom_error_1.CustomError.internalSever();
            }
        });
    }
}
exports.EventDatasourceImpl = EventDatasourceImpl;
