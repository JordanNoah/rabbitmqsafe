import {PropertiesRabbitEventDto} from "../dtos/rabbit-event/properties-rabbit-event.dto";
import {PropertiesEntity} from "../entities/properties.entity";

export abstract class PropertyRepository {
    abstract register(propertiesRabbitEventDto: PropertiesRabbitEventDto): Promise<PropertiesEntity>
    abstract findByPk(id: number): Promise<PropertiesEntity | null>
}