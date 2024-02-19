export abstract class SecretRepository {
    abstract encrypt(key: string): Promise<string>
    abstract desEncrypt(key: string): Promise<string>
}