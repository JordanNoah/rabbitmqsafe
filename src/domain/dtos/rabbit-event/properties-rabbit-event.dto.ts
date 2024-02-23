export class PropertiesRabbitEventDto {
    private constructor(
        public contentType: string | undefined,
        public contentEncoding: string | undefined,
        public headers: string | undefined,
        public deliveryMode: number | undefined,
        public priority: number | undefined,
        public correlationId: number | undefined,
        public replyTo: string | undefined,
        public expiration: string | undefined,
        public messageId: string | undefined,
        public timestamp: number | undefined,
        public type: string,
        public userId: string | undefined,
        public appId: string | undefined,
        public clusterId: string | undefined
    ) {}
}