"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configServer = exports.configSwagger = exports.configApp = void 0;
var app_1 = __importDefault(require("./app"));
exports.configApp = app_1.default;
var swagger_1 = __importDefault(require("./swagger"));
exports.configSwagger = swagger_1.default;
var server_1 = __importDefault(require("./server"));
exports.configServer = server_1.default;
