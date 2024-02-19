export abstract class SecretDatasource {
    abstract encrypt(key: string): Promise<string>
    abstract desEncrypt(key: string): Promise<string>
}