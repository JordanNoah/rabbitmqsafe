import {FieldsRabbitEventDto} from "./fields-rabbit-event.dto";
import {PropertiesRabbitEventDto} from "./properties-rabbit-event.dto";

export class ReceivedRabbitEventDto{
    private constructor(
        public fields: FieldsRabbitEventDto,
        public properties: PropertiesRabbitEventDto,
        public content: string
    ) {}

    static create(object:{[key:string]:any}):[string?,ReceivedRabbitEventDto?]{
        const {
            fields,
            properties,
            content
        } = object

        return[
            undefined,
            new ReceivedRabbitEventDto(
                fields,
                properties,
                content
            )
        ]
    }
}