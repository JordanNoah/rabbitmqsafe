export class TableDto {
    private constructor(
        public page: number,
        public limit: number,
        public order: {row: string,desc: boolean}
    ) {}

    static create(object:{[key:string]:any}):[string?,TableDto?]{
        const {
            page,
            limit,
            order
        } = object

        if (page === undefined) return ['Missing page']
        if (limit === undefined) return ['Missing limit']

        return [
            undefined,
            new TableDto(
                page,limit,order
            )
        ]
    }
}