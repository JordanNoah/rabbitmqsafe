"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const init_1 = require("../infrastructure/database/init");
const rabbitmq_1 = require("../infrastructure/eventBus/rabbitmq");
const io_1 = require("../infrastructure/socket/io");
class Server {
    constructor(options) {
        this.app = (0, express_1.default)();
        const { port = 3030, routes } = options;
        this.port = port;
        this.routes = routes;
    }
    start() {
        (0, init_1.DbSequelize)()
            .then(() => __awaiter(this, void 0, void 0, function* () {
            const server = http_1.default.createServer(this.app);
            new io_1.SocketManager(server);
            yield rabbitmq_1.Rabbitmq.init();
            this.app.use(express_1.default.json());
            this.app.use(this.routes);
            this.app.use('/static/js', express_1.default.static("src/presentation/public/js"));
            server.listen(this.port, () => {
                console.log(`Server running on PORT: ${this.port}`);
            });
        })).catch((err) => {
            console.error(err);
        });
    }
}
exports.Server = Server;
