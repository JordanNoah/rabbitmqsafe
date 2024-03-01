"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketManager = void 0;
const socket_io_1 = require("socket.io");
class SocketManager {
    constructor(server) {
        SocketManager.io = new socket_io_1.Server(server);
        this.setupSocketEvents();
    }
    setupSocketEvents() {
        SocketManager.io.on('connection', (socket) => {
            console.log('Usuario conectado:', socket.id);
        });
    }
    static emit(eventName, data) {
        SocketManager.io.emit(eventName, data);
    }
    static getSocket() {
        return SocketManager.io;
    }
}
exports.SocketManager = SocketManager;
