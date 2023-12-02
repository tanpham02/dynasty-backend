"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
require("module-alias/register");
var configs_1 = require("@app/configs");
var connection_1 = __importDefault(require("@app/connection"));
var routes_1 = require("./routes");
var app = (0, express_1.default)();
var _a = (0, configs_1.configApp)(), APP_URL = _a.APP_URL, port = _a.port;
// Connect DB
(0, connection_1.default)();
// Config Server
(0, configs_1.configServer)(app);
// Config Swagger
(0, configs_1.configSwagger)(app);
// Routes
(0, routes_1.routesMapping)(app);
app.listen(port, function () {
    console.log("Server is running at ".concat(APP_URL));
});
