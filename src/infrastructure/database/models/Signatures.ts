import { Model, DataTypes } from "sequelize";
import { sequelize } from "../sequelize";

interface SignaturesRow {
    id: number,
    uuid: string,
    name: string,
    createdAt?: Date,
    updatedAt?: Date
}

export class SequelizeSignature extends Model<SignaturesRow,Omit<SignaturesRow, 'id'>> {
    declare id: number
    declare uuid: string
    declare name: string
    declare readonly createdAt: Date
    declare readonly updatedAt: Date
}

SequelizeSignature.init({
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    uuid:{
        type: DataTypes.UUID,
        allowNull: false
    },
    name:{
        type: DataTypes.TEXT,
        allowNull: false
    }
},{
    sequelize,
    timestamps: true,
    tableName: 'signature'
})