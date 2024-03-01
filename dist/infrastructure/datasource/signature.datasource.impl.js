"use strict";
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
exports.SignatureDatasourceImpl = void 0;
const custom_error_1 = require("../../domain/errors/custom.error");
const Signatures_1 = require("../database/models/Signatures");
class SignatureDatasourceImpl {
    register(registerSignatureDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { uuid, name } = registerSignatureDto;
                const [signatureDb, created] = yield Signatures_1.SequelizeSignature.findOrCreate({
                    where: {
                        name: name
                    },
                    defaults: {
                        name: name,
                        uuid: uuid,
                        active: true
                    }
                });
                return signatureDb;
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
                return yield Signatures_1.SequelizeSignature.findOne({
                    where: {
                        id: id
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
                return yield Signatures_1.SequelizeSignature.findAll();
            }
            catch (error) {
                if (error instanceof custom_error_1.CustomError) {
                    throw error;
                }
                throw custom_error_1.CustomError.internalSever();
            }
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const signature = yield this.getById(id);
                if (!signature)
                    throw custom_error_1.CustomError.notFound('Signature not found');
                yield Signatures_1.SequelizeSignature.destroy({
                    where: {
                        id: id
                    }
                });
                return signature;
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
                return yield Signatures_1.SequelizeSignature.findOne({
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
    update(registerSignatureDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { uuid, name } = registerSignatureDto;
                const signature = yield this.getByUuid(uuid);
                if (!signature)
                    throw custom_error_1.CustomError.notFound('Signature not found');
                yield Signatures_1.SequelizeSignature.update({
                    name: name
                }, {
                    where: {
                        uuid: uuid
                    }
                });
                return yield this.getByUuid(uuid);
            }
            catch (error) {
                if (error instanceof custom_error_1.CustomError) {
                    throw error;
                }
                throw custom_error_1.CustomError.internalSever();
            }
        });
    }
    existSignature(signature) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const signatureDb = yield Signatures_1.SequelizeSignature.findOne({
                    where: {
                        name: signature,
                        active: true
                    }
                });
                return !!signatureDb;
            }
            catch (error) {
                if (error instanceof custom_error_1.CustomError) {
                    throw error;
                }
                throw custom_error_1.CustomError.internalSever();
            }
        });
    }
    deleteByUuid(uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const signature = yield this.getByUuid(uuid);
                if (!signature)
                    throw custom_error_1.CustomError.notFound('Signature not found');
                yield Signatures_1.SequelizeSignature.destroy({
                    where: {
                        uuid: uuid
                    }
                });
                return signature;
            }
            catch (error) {
                if (error instanceof custom_error_1.CustomError) {
                    throw error;
                }
                throw custom_error_1.CustomError.internalSever();
            }
        });
    }
    setOnSignature(uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const signature = yield this.getByUuid(uuid);
                if (!signature)
                    throw custom_error_1.CustomError.notFound('Signature not found');
                yield Signatures_1.SequelizeSignature.update({
                    active: true
                }, {
                    where: {
                        uuid: uuid
                    }
                });
                signature.active = true;
                return signature;
            }
            catch (error) {
                if (error instanceof custom_error_1.CustomError) {
                    throw error;
                }
                throw custom_error_1.CustomError.internalSever();
            }
        });
    }
    setOffSignature(uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const signature = yield this.getByUuid(uuid);
                if (!signature)
                    throw custom_error_1.CustomError.notFound('Signature not found');
                yield Signatures_1.SequelizeSignature.update({
                    active: false
                }, {
                    where: {
                        uuid: uuid
                    }
                });
                signature.active = false;
                return signature;
            }
            catch (error) {
                if (error instanceof custom_error_1.CustomError) {
                    throw error;
                }
                throw custom_error_1.CustomError.internalSever();
            }
        });
    }
    totalSignatures() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield Signatures_1.SequelizeSignature.count();
            }
            catch (error) {
                if (error instanceof custom_error_1.CustomError) {
                    throw error;
                }
                throw custom_error_1.CustomError.internalSever();
            }
        });
    }
}
exports.SignatureDatasourceImpl = SignatureDatasourceImpl;
