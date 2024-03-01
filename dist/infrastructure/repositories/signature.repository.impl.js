"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignatureRepositoryImpl = void 0;
class SignatureRepositoryImpl {
    constructor(signatureDatasource) {
        this.signatureDatasource = signatureDatasource;
    }
    register(registerSignatureDto) {
        return this.signatureDatasource.register(registerSignatureDto);
    }
    getById(id) {
        return this.signatureDatasource.getById(id);
    }
    getAll() {
        return this.signatureDatasource.getAll();
    }
    deleteById(id) {
        return this.signatureDatasource.deleteById(id);
    }
    update(registerSignatureDto) {
        return this.signatureDatasource.update(registerSignatureDto);
    }
    getByUuid(uuid) {
        return this.signatureDatasource.getByUuid(uuid);
    }
    deleteByUuid(uuid) {
        return this.signatureDatasource.deleteByUuid(uuid);
    }
    existSignature(signature) {
        return this.signatureDatasource.existSignature(signature);
    }
    setOnSignature(uuid) {
        return this.signatureDatasource.setOnSignature(uuid);
    }
    setOffSignature(uuid) {
        return this.signatureDatasource.setOffSignature(uuid);
    }
}
exports.SignatureRepositoryImpl = SignatureRepositoryImpl;
