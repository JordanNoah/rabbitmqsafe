import {RegisterSignatureDto, SignatureDatasource, SignatureEntity, SignatureRepository} from "../../domain";

export class SignatureRepositoryImpl implements SignatureRepository {
    constructor(
        private readonly signatureDatasource: SignatureDatasource
    ) {}

    register(registerSignatureDto: RegisterSignatureDto): Promise<SignatureEntity> {
        return this.signatureDatasource.register(registerSignatureDto)
    }
    getById(id: number): Promise<SignatureEntity | null> {
        return this.signatureDatasource.getById(id)
    }

    getAll(): Promise<SignatureEntity[]> {
        return this.signatureDatasource.getAll()
    }

    deleteById(id: number): Promise<SignatureEntity> {
        return this.signatureDatasource.deleteById(id)
    }

    update(registerSignatureDto: RegisterSignatureDto): Promise<SignatureEntity | null> {
        return this.signatureDatasource.update(registerSignatureDto)
    }

    getByUuid(uuid: string): Promise<SignatureEntity | null> {
        return this.signatureDatasource.getByUuid(uuid)
    }


}