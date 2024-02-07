export class SignatureEntity {
    constructor(
        public id: number,
        public uuid: string,
        public name: string,
        public active: boolean,
        public createdAt: Date,
        public updatedAt: Date
    ) {}
}