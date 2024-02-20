export class PropertiesEntity {
    constructor(
        public id: number,
        public contentType: string | undefined,
        public contentEncoding: string | null,
        public headers: string | null,
        public deliveryMode: number | undefined,
        public priority: number | null,
        public correlationId: number | null,
        public replyTo: string | null,
        public expiration: string | null,
        public messageId: string | undefined,
        public timestamp: number | undefined,
        public type: string | undefined,
        public userId: string | null,
        public appId: string | undefined,
        public clusterId: string | null,
        public createdAt: Date,
        public updatedAt: Date
    ) {}
}