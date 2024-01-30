import {SequelizeField} from "./models/Fields";
import {SequelizeEvent} from "./models/Events";
import {SequelizeProperty} from "./models/Properties";
import {SequelizeSignature} from "./models/Signatures";

export const DbSequelize = (): Promise<void> => {
    return new Promise((resolve, reject) => {
        SequelizeField.sync().catch((err) => {reject()})
        SequelizeEvent.sync().catch((err) => {reject()})
        SequelizeProperty.sync().catch((err) => {reject()})
        SequelizeSignature.sync().catch((err) => {reject()})

        SequelizeEvent.belongsTo(SequelizeField, {foreignKey: 'fieldsId', as: 'field'});
        SequelizeEvent.belongsTo(SequelizeProperty, { foreignKey: 'propertiesId', as: 'property' });
        resolve();
    })
}