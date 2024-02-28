import { Server, Socket } from 'socket.io';

export class SocketManager {
    private static io: Server;

    constructor(server: any) {
        SocketManager.io = new Server(server);
        this.setupSocketEvents();
    }

    private setupSocketEvents() {
        SocketManager.io.on('connection', (socket: Socket) => {
            console.log('Usuario conectado:', socket.id);
        });
    }

    public static emit(eventName: string, data: any) {
        SocketManager.io.emit(eventName, data);
    }

    public static getSocket(): Server{
        return SocketManager.io;
    }
}