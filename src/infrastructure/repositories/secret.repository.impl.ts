import {SecretRepository} from "../../domain/repositories/secret.repository";
import {SecretDatasource} from "../../domain/datasources/secret.datasource";

export class SecretRepositoryImpl implements SecretRepository {
    constructor(
        private readonly secretDatasource:SecretDatasource
    ) {}

    encrypt(key: string): Promise<string> {
        return this.secretDatasource.encrypt(key)
    }

    async desEncrypt(key: string): Promise<string> {
        return this.secretDatasource.desEncrypt(key)
    }
}