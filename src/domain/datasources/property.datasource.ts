import {PropertiesEntity} from "../entities/properties.entity";
import {PropertiesRabbitEventDto} from "../dtos/rabbit-event/properties-rabbit-event.dto";

export abstract class PropertyDatasource {
    abstract register(propertiesRabbitEventDto: PropertiesRabbitEventDto): Promise<PropertiesEntity>
}