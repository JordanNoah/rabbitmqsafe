import {SequelizeField} from "./models/Fields";
import {SequelizeEvent} from "./models/Events";
import {SequelizeProperty} from "./models/Properties";
import {SequelizeSignature} from "./models/Signatures";

export const DbSequelize = (): Promise<void> => {
    return new Promise( async (resolve, reject) => {
        await SequelizeField.sync({force:true}).catch((err) => {reject()})
        await SequelizeEvent.sync({force:true}).catch((err) => {reject()})
        await SequelizeProperty.sync({force:true}).catch((err) => {reject()})
        await SequelizeSignature.sync({force:true}).catch((err) => {reject()})


        SequelizeEvent.hasOne(SequelizeField, {as: 'field'});
        SequelizeEvent.hasOne(SequelizeProperty, {as: 'property'});
        resolve();
    })
}