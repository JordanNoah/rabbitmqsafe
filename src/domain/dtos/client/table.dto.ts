export class TableDto {
    private constructor(
        public page: number,
        public limit: number
    ) {}

    static create(object:{[key:string]:any}):[string?,TableDto?]{
        const {
            page,
            limit
        } = object

        if (page === undefined) return ['Missing page']
        if (limit === undefined) return ['Missing limit']

        return [
            undefined,
            new TableDto(
                page,limit
            )
        ]
    }
}