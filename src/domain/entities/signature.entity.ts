export class SignatureEntity {
    constructor(
        public id: number,
        public uuid: string,
        public name: string,
        public createdAt: Date,
        public updatedAt: Date
    ) {}
}