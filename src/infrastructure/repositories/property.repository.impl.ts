 import {PropertyRepository} from "../../domain/repositories/property.repository";
import {PropertyDatasource} from "../../domain/datasources/property.datasource";
import {PropertiesEntity, PropertiesRabbitEventDto} from "../../domain";

export class PropertyRepositoryImpl implements PropertyRepository {
    constructor(
        private readonly propertyDatasource: PropertyDatasource
    ) {}

    register(propertiesRabbitEventDto: PropertiesRabbitEventDto): Promise<PropertiesEntity> {
        return this.propertyDatasource.register(propertiesRabbitEventDto)
    }

    findByPk(id: number): Promise<PropertiesEntity | null> {
        return this.propertyDatasource.findByPk(id)
    }
}