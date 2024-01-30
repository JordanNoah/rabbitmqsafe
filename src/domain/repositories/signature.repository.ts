import {RegisterSignatureDto} from "../dtos/signature/register-signature.dto";
import {SignatureEntity} from "../entities/signature.entity";

export abstract class SignatureRepository {
    abstract register(registerSignatureDto: RegisterSignatureDto):Promise<SignatureEntity>
    abstract getById(id: number): Promise<SignatureEntity|null>
    abstract getAll(): Promise<SignatureEntity[]>
    abstract deleteById(id: number): Promise<SignatureEntity>
    abstract update(registerSignatureDto: RegisterSignatureDto): Promise<SignatureEntity | null>
    abstract getByUuid(uuid: string): Promise<SignatureEntity|null>
}