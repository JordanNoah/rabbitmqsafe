export class PropertiesEntity {
    constructor(
        public id: number,
        public contentType: string | null,
        public contentEncoding: string | null,
        public headers: string | null,
        public deliveryMode: number | null,
        public priority: number | null,
        public correlationId: number | null,
        public replyTo: string | null,
        public expiration: string | null,
        public messageId: string | null,
        public timestamp: string | null,
        public type: string | null,
        public userId: string | null,
        public appId: string | null,
        public clusterId: string | null,
        public createdAt: Date,
        public updatedAt: Date
    ) {}
}