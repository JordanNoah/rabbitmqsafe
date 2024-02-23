import { Model, DataTypes } from "sequelize";
import { sequelize } from "../sequelize";
import { SequelizeField } from "./Fields";
import { SequelizeProperty } from "./Properties";

interface EventsRow {
    id: number,
    uuid: string,
    content?: string,
    fieldId: number,
    propertyId: number,
    createdAt?: Date,
    updatedAt?: Date
}

export class SequelizeEvent extends Model<EventsRow, Omit<EventsRow, 'id'>> {
    declare id: number
    declare uuid: string
    declare content: string | null
    declare fieldId: number
    declare propertyId: number
    declare readonly createdAt: Date
    declare readonly updatedAt: Date
    declare field: SequelizeField
    declare property: SequelizeProperty
}

SequelizeEvent.init({
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    uuid:{
        type: DataTypes.UUID,
        allowNull:false
    },
    content:{
        type:DataTypes.TEXT('long'),
        allowNull:true
    },
    fieldId:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    propertyId:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
},{
    sequelize,
    timestamps: true,
    tableName:'event'
})