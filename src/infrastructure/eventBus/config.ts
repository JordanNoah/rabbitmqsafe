import { ServerProperties, Options } from "amqplib";
import AppConfig from "../../domain/config"
import {SequelizeSignature} from "../database/models/Signatures";
import {SignatureRepository} from "../../domain";
import {SignatureRepositoryImpl} from "../repositories/signature.repository.impl";
import {SignatureDatasourceImpl} from "../datasource/signature.datasource.impl";

export const config: Options.Connect = {
    username: AppConfig.RABBIT_USERNAME,
    password: AppConfig.RABBIT_PASSWORD,
    protocol: AppConfig.RABBIT_PROTOCOL,
    hostname: AppConfig.RABBIT_HOSTNAME,
    port: 5672,
    vhost: AppConfig.RABBIT_VHOST
}

export const assertQueue: Options.AssertQueue = {
    exclusive: false,
    durable: true
}

export const assertExchange: Options.AssertExchange = {
    durable: true
}

export const eventList = async () => {
    return await new SignatureDatasourceImpl().getAll();
}