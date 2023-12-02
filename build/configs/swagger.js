"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
var swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
var configs_1 = require("@app/configs");
var configSwagger = function (app) {
    var APP_URL = (0, configs_1.configApp)().APP_URL;
    var options = {
        definition: {
            openapi: '3.1.0',
            info: {
                title: 'Dynasty API',
                version: '1.0.0',
                description: 'This is a simple API application made with NodeJS + Express and documented with Swagger',
                license: {
                    name: 'MIT',
                    url: 'https://spdx.org/licenses/MIT.html',
                },
                contact: {
                    name: 'Pham Van Tan',
                    email: 'phamvantan1311@gmail.com',
                },
            },
            servers: [
                {
                    url: "".concat(APP_URL),
                },
            ],
            components: {
                securitySchemes: {
                    bearerAuth: {
                        type: 'http',
                        name: 'Authorization',
                        scheme: 'bearer',
                        in: 'header',
                    },
                    security: [
                        {
                            bearerAuth: [],
                        },
                    ],
                },
            },
        },
        apis: ['src/routes/*.ts', 'src/routes/**.ts', 'src/models/*/*.ts', 'src/models/*/**.ts'],
    };
    var specs = (0, swagger_jsdoc_1.default)(options);
    app.use('/dynasty/documentation', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(specs));
};
exports.default = configSwagger;
