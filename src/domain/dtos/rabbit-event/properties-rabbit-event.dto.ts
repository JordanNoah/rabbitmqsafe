export class PropertiesRabbitEventDto {
    private constructor(
        public contentType: string | undefined,
        public contentEncoding: string | undefined,
        public headers: string | undefined,
        public deliveryMode: string | undefined,
        public priority: string | undefined,
        public correlationId: string | undefined,
        public replyTo: string | undefined,
        public expiration: string | undefined,
        public messageId: string | undefined,
        public timestamp: number | undefined,
        public type: string | undefined,
        public userId: string | undefined,
        public appId: string | undefined,
        public clusterId: string | undefined
    ) {}
}