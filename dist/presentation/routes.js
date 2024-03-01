"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRoutes = void 0;
const express_1 = require("express");
const path_1 = __importDefault(require("path"));
const routes_1 = require("./signature/routes");
const routes_2 = require("./event/routes");
const routes_3 = require("./field/routes");
const routes_4 = require("./secret/routes");
const routes_5 = require("./rabbit/routes");
class AppRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        router.get('/', (req, res) => {
            res.sendFile(path_1.default.join(__dirname, './public/index.html'));
        });
        router.use('/api/signature', routes_1.SignatureRoutes.routes);
        router.use('/api/event', routes_2.EventRoutes.routes);
        router.use('/api/field', routes_3.FieldRoutes.routes);
        router.use('/api/secret', routes_4.SecretRoutes.routes);
        router.use('/api/rabbit', routes_5.RabbitRoutes.routes);
        return router;
    }
}
exports.AppRoutes = AppRoutes;
