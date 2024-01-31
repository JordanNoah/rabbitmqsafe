export class PropertiesEntity {
    constructor(
        public id: number,
        public contentType: string,
        public contentEncoding: string,
        public headers: string,
        public deliveryMode: string,
        public priority: number,
        public correlationId: number,
        public replyTo: string,
        public expiration: string,
        public messageId: string,
        public timestamp: number,
        public type: string,
        public userId: string,
        public appId: string,
        public clusterId: string,
        public createdAt: Date,
        public updatedAt: Date
    ) {}
}