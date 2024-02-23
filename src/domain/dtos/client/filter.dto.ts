export class FilterDto {
    private constructor(
        public uuid: string,
        public filter: {
            name: string
            key: string
        },
        public text: string
    ) {}
}