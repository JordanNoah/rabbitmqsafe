import {TableDto} from "./table.dto";
import {FilterDto} from "./filter.dto";

export class FiltersTableDto {
    private constructor(
        public filters: FilterDto[],
        public tableConfig: TableDto
    ) {}

    static create(object:{[key:string]:any}):[string?,FiltersTableDto?]{
        const {
            filters,
            tableConfig
        } = object

        return [
            undefined,
            new FiltersTableDto(
                filters,
                tableConfig
            )
        ]
    }
}