"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableDto = void 0;
class TableDto {
    constructor(page, limit, order) {
        this.page = page;
        this.limit = limit;
        this.order = order;
    }
    static create(object) {
        const { page, limit, order } = object;
        if (page === undefined)
            return ['Missing page'];
        if (limit === undefined)
            return ['Missing limit'];
        return [
            undefined,
            new TableDto(page, limit, order)
        ];
    }
}
exports.TableDto = TableDto;
