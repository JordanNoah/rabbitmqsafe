export class RegisterSignatureDto{
    private constructor(
        public uuid: string,
        public name: string
    ) {}

    static create(object: {[key:string]:any}):[string?,RegisterSignatureDto?]{
        const {
            uuid,
            name
        } = object

        if (!uuid) return ['Missing uuid']
        if (!name) return ['Missing name']

        return [
            undefined,
            new RegisterSignatureDto(
                uuid,
                name
            )
        ]
    }
}