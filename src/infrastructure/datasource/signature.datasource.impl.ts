import {RegisterSignatureDto, SignatureDatasource, SignatureEntity} from "../../domain";
import {CustomError} from "../../domain/errors/custom.error";
import {SequelizeSignature} from "../database/models/Signatures";

export class SignatureDatasourceImpl implements SignatureDatasource {
    async register(registerSignatureDto: RegisterSignatureDto): Promise<SignatureEntity> {
        try {
            const { uuid , name} = registerSignatureDto

            const [signatureDb, created] = await SequelizeSignature.findOrCreate({
                where: {
                    name: name
                },
                defaults: {
                    name: name,
                    uuid: uuid
                }
            });

            return signatureDb;
        }catch (error){
            if (error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalSever()
        }
    }
    async getById(id: number): Promise<SignatureEntity | null> {
        try {
            return await SequelizeSignature.findOne({
                where:{
                    id:id
                }
            })
        }catch (error) {
            if (error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalSever()
        }
    }

    async getAll(): Promise<SignatureEntity[]> {
        try {
            return await SequelizeSignature.findAll()
        }catch (error) {
            if (error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalSever()
        }
    }

    async deleteById(id: number): Promise<SignatureEntity> {
        try {
            const signature = await this.getById(id)

            if(!signature) throw CustomError.notFound('Signature not found')

            await SequelizeSignature.destroy({
                where:{
                    id:id
                }
            })
            return signature
        }catch (error){
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever()
        }
    }

    async getByUuid(uuid: string): Promise<SignatureEntity | null> {
        try {
            return await SequelizeSignature.findOne({
                where:{
                    uuid:uuid
                }
            })
        }catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever()
        }
    }

    async update(registerSignatureDto: RegisterSignatureDto): Promise<SignatureEntity | null> {
        try {
            const { uuid, name } = registerSignatureDto

            const signature = await this.getByUuid(uuid)

            if (!signature) throw CustomError.notFound('Signature not found')

            await SequelizeSignature.update({
                name:name
            },{
                where:{
                    uuid:uuid
                }
            })

            return await this.getByUuid(uuid)
        }catch (error){
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever()
        }
    }

    async existSignature(signature: string): Promise<boolean> {
        try {
            const signatureDb = await SequelizeSignature.findOne({
                where:{
                    name:signature
                }
            })
            return !!signatureDb
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever()
        }
    }

}