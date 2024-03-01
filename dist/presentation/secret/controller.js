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
exports.SecretController = void 0;
class SecretController {
    constructor(secretRepository) {
        this.secretRepository = secretRepository;
        this.encrypt = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const encryptObj = {};
                for (const key in req.body) {
                    if (req.body.hasOwnProperty(key)) {
                        encryptObj[key] = yield this.secretRepository.encrypt(req.body[key]);
                    }
                }
                res.json(encryptObj);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
        this.desEncrypt = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const desEncryptObj = {};
                for (const key in req.body) {
                    if (req.body.hasOwnProperty(key)) {
                        desEncryptObj[key] = yield this.secretRepository.desEncrypt(req.body[key]);
                    }
                }
                res.json(desEncryptObj);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
}
exports.SecretController = SecretController;
