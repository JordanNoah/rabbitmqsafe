import {SequelizeField} from "./models/Fields";
import {SequelizeEvent} from "./models/Events";
import {SequelizeProperty} from "./models/Properties";
import {SequelizeSignature} from "./models/Signatures";
import {sequelize} from "./sequelize";

export const DbSequelize = (): Promise<void> => {
    return new Promise( async (resolve, reject) => {

        SequelizeEvent.belongsTo(SequelizeField,{as:'field'});
        SequelizeEvent.belongsTo(SequelizeProperty,{as:'property'});

        sequelize.sync({force:false}).then(() => {
            resolve();
        }).catch((err)=> {
            console.log(err)
            reject();
        })
    })
}