"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FiltersTableDto = void 0;
class FiltersTableDto {
    constructor(filters, tableConfig) {
        this.filters = filters;
        this.tableConfig = tableConfig;
    }
    static create(object) {
        const { filters, tableConfig } = object;
        return [
            undefined,
            new FiltersTableDto(filters, tableConfig)
        ];
    }
}
exports.FiltersTableDto = FiltersTableDto;
