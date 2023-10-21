"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
require("module-alias/register");
var constants_1 = require("@app/constants");
var configApp = function () {
    dotenv_1.default.config({ path: '.env.development' });
    var resultConfig = {
        port: process.env.PORT ? Number(process.env.PORT) : 8081,
        MONGO_URL: process.env.MONGO_URL || '',
        APP_URL: "".concat(process.env.BASE_URL, ":").concat(process.env.PORT),
    };
    if (process.env.NODE_ENV === constants_1.MODE.PRODUCTION) {
        dotenv_1.default.config({ path: '.env.production' });
        resultConfig = {
            port: process.env.PORT ? Number(process.env.PORT) : 8081,
            MONGO_URL: process.env.MONGO_URL || '',
            APP_URL: "".concat(process.env.BASE_URL, ":").concat(process.env.PORT),
        };
    }
    resultConfig.jwtAccessKey = process.env.JWT_ACCESS_KEY;
    resultConfig.jwtRefreshKey = process.env.JWT_REFRESH_KEY;
    return resultConfig;
};
exports.default = configApp;
