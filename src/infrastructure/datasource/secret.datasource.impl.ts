import {SecretDatasource} from "../../domain/datasources/secret.datasource";
import * as CryptoJs from "crypto-js";
import Config from "../../domain/config";
import {CustomError} from "../../domain/errors/custom.error";

export class SecretDatasourceImpl implements SecretDatasource{
    async encrypt(key: string): Promise<string> {
        try {
            return CryptoJs.Rabbit.encrypt(key,Config.ENCRYPT_KEY).toString();
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever()
        }
    }

    async desEncrypt(key: string): Promise<string> {
        try {
            const bytes  = CryptoJs.Rabbit.decrypt(key, Config.ENCRYPT_KEY);
            return bytes.toString(CryptoJs.enc.Utf8);
        }catch (error) {
            console.log(error)
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever()
        }
    }
}