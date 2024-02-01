import {EventDatasource, EventEntity, FieldsEntity, PropertiesEntity, ReceivedRabbitEventDto} from "../../domain";
import {CustomError} from "../../domain/errors/custom.error";
import {SequelizeEvent} from "../database/models/Events";
import {SequelizeProperty} from "../database/models/Properties";
import {SequelizeField} from "../database/models/Fields";

export class EventDatasourceImpl implements EventDatasource {
    async register(receivedRabbitEventDto: ReceivedRabbitEventDto): Promise<EventEntity> {
        try {
            const { fields, content, properties } = receivedRabbitEventDto

            SequelizeEvent.create(receivedRabbitEventDto,{
                include:[{
                    model: SequelizeProperty,
                    as:'property'
                },{
                    model: SequelizeField,
                    as:'field'
                }]
            }).catch((err) =>{
                console.log(err)
            })

            const field = new FieldsEntity(
                1,
                '',
                '',
                true,
                '',
                '',
                new Date(),
                new Date()
            );

            const property = new PropertiesEntity(
                23,
                '',
                '',
                '',
                '',
                1,
                123,
                '',
                '',
                '',
                1706728758,
                '',
                '',
                '',
                '',
                new Date(),
                new Date()
            );

            return new EventEntity(
                1,
                property,
                field,
                '',
                new Date(),
                new Date()
            )
        }catch (error) {
            if (error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalSever()
        }
    }
}