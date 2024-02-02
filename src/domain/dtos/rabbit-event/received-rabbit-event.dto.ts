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

        console.log(fields)
        console.log(properties)
        console.log("content",content)

        if (!fields) return ['Missing fields structure',undefined]
        if (!properties) return ['Missing properties structure',undefined]

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