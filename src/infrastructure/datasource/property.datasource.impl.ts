import {PropertyDatasource} from "../../domain/datasources/property.datasource";
import {PropertiesEntity, PropertiesRabbitEventDto} from "../../domain";
import {CustomError} from "../../domain/errors/custom.error";
import {SequelizeProperty} from "../database/models/Properties";

export class PropertyDatasourceImpl implements PropertyDatasource {
    async register(propertiesRabbitEventDto: PropertiesRabbitEventDto): Promise<PropertiesEntity> {
        try {
            return await SequelizeProperty.create({
                contentType: propertiesRabbitEventDto.contentType,
                contentEncoding: propertiesRabbitEventDto.contentEncoding,
                headers: propertiesRabbitEventDto.contentEncoding,
                deliveryMode: propertiesRabbitEventDto.deliveryMode,
                priority: propertiesRabbitEventDto.priority,
                correlationId: propertiesRabbitEventDto.correlationId,
                replyTo: propertiesRabbitEventDto.replyTo,
                appId: propertiesRabbitEventDto.appId,
                type: propertiesRabbitEventDto.type,
                clusterId: propertiesRabbitEventDto.clusterId,
                expiration: propertiesRabbitEventDto.expiration,
                messageId: propertiesRabbitEventDto.messageId,
                userId: propertiesRabbitEventDto.userId,
                timestamp: propertiesRabbitEventDto.timestamp
            })
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalSever()
        }
    }
}