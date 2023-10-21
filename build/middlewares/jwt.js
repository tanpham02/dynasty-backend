"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = require("jsonwebtoken");
var configs_1 = require("@app/configs");
var _a = (0, configs_1.configApp)(), jwtAccessKey = _a.jwtAccessKey, jwtRefreshKey = _a.jwtRefreshKey;
var JWT = /** @class */ (function () {
    function JWT() {
    }
    // GENERATE ACCESS TOKEN
    JWT.prototype.generateAccessToken = function (objectRes) {
        return (0, jsonwebtoken_1.sign)({
            id: objectRes._id,
            role: objectRes.role,
        }, jwtAccessKey !== null && jwtAccessKey !== void 0 ? jwtAccessKey : '', {
            expiresIn: '1d',
        });
    };
    // GENERATE REFRESH TOKEN
    JWT.prototype.generateRefreshToken = function (objectRes) {
        return (0, jsonwebtoken_1.sign)({
            id: objectRes._id,
            role: objectRes.role,
        }, jwtRefreshKey !== null && jwtRefreshKey !== void 0 ? jwtRefreshKey : '', {
            expiresIn: '7d',
        });
    };
    return JWT;
}());
exports.default = JWT;
