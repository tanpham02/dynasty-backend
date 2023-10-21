"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyTokenAndAuthenRole = exports.verifyToken = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
var configs_1 = require("@app/configs");
var _type_1 = require("@app/models/user/@type");
var verifyToken = function (req, res, next) {
    var _a, _b;
    var token = (_b = (_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.authorization) !== null && _b !== void 0 ? _b : '';
    var jwtAccessKey = (0, configs_1.configApp)().jwtAccessKey;
    if (token) {
        var accessToken = token.split(' ')[1];
        (0, jsonwebtoken_1.verify)(accessToken, jwtAccessKey !== null && jwtAccessKey !== void 0 ? jwtAccessKey : '', function (err, user) {
            if (err) {
                return res.status(403).json('Token is not valid!');
            }
            res.setHeader('Authorization', token);
            req.user = user;
            next();
        });
    }
    else {
        res.status(401).json("You're not authenticated");
    }
};
exports.verifyToken = verifyToken;
var verifyTokenAndAuthenRole = function (req, res, next) {
    verifyToken(req, res, function () {
        var _a;
        if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) !== _type_1.Role.ADMIN) {
            res.status(403).json({ message: "You'er not allow delete this user" });
        }
        else {
            next();
        }
    });
};
exports.verifyTokenAndAuthenRole = verifyTokenAndAuthenRole;
