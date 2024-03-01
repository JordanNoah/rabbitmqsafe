"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routes_1 = require("./presentation/routes");
const server_1 = require("./presentation/server");
(() => {
    main();
})();
function main() {
    new server_1.Server({ routes: routes_1.AppRoutes.routes }).start();
}
