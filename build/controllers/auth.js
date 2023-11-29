"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var auth_1 = __importDefault(require("@app/services/auth"));
var type_1 = require("@app/exception/type");
var exception_1 = require("@app/exception");
var authController = {
    // SIGNUP CUSTOMER
    signup: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var message, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, auth_1.default.signup(req, res)];
                case 1:
                    message = (_a.sent()).message;
                    res.status(type_1.HttpStatusCode.OK).json(message);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.log('🚀 ~ file: auth.ts:13 ~ signup: ~ error:', error_1);
                    if (error_1 instanceof exception_1.Exception) {
                        return [2 /*return*/, res.status(error_1.status).json(error_1.message)];
                    }
                    res.status(type_1.HttpStatusCode.INTERNAL_SERVER).json(type_1.INTERNAL_SERVER_ERROR_MSG);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); },
    // LOGIN FOR USER
    loginUser: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var response, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, auth_1.default.loginUser(req, res)];
                case 1:
                    response = _a.sent();
                    res.status(type_1.HttpStatusCode.OK).json(response);
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    console.log('🚀 ~ file: auth.ts:27 ~ loginUser: ~ error:', error_2);
                    if (error_2 instanceof exception_1.Exception) {
                        return [2 /*return*/, res.status(error_2.status).json(error_2.message)];
                    }
                    res.status(type_1.HttpStatusCode.INTERNAL_SERVER).json(type_1.INTERNAL_SERVER_ERROR_MSG);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); },
    // LOGIN FOR CUSTOMER
    loginCustomer: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var response, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, auth_1.default.loginCustomer(req, res)];
                case 1:
                    response = _a.sent();
                    res.status(type_1.HttpStatusCode.OK).json(response);
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    console.log('🚀 ~ file: auth.ts:41 ~ loginCustomer: ~ error:', error_3);
                    if (error_3 instanceof exception_1.Exception) {
                        return [2 /*return*/, res.status(error_3.status).json(error_3.message)];
                    }
                    res.status(type_1.HttpStatusCode.INTERNAL_SERVER).json(type_1.INTERNAL_SERVER_ERROR_MSG);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); },
    // REQUEST REFRESH TOKEN FOR USER
    requestRefreshTokenForUser: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var accessToken, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, auth_1.default.requestRefreshTokenForUser(req, res)];
                case 1:
                    accessToken = (_a.sent()).accessToken;
                    res.status(type_1.HttpStatusCode.OK).json(accessToken);
                    return [3 /*break*/, 3];
                case 2:
                    error_4 = _a.sent();
                    console.log('🚀 ~ file: auth.ts:55 ~ requestRefreshTokenForUser: ~ error:', error_4);
                    if (error_4 instanceof exception_1.Exception) {
                        return [2 /*return*/, res.status(error_4.status).json(error_4.message)];
                    }
                    res.status(type_1.HttpStatusCode.INTERNAL_SERVER).json(type_1.INTERNAL_SERVER_ERROR_MSG);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); },
    // REQUEST REFRESH TOKEN FOR CUSTOMER
    requestRefreshTokenForCustomer: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var accessToken, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, auth_1.default.requestRefreshTokenForCustomer(req, res)];
                case 1:
                    accessToken = (_a.sent()).accessToken;
                    res.status(type_1.HttpStatusCode.OK).json(accessToken);
                    return [3 /*break*/, 3];
                case 2:
                    error_5 = _a.sent();
                    console.log('🚀 ~ file: auth.ts:69 ~ requestRefreshTokenForCustomer: ~ error:', error_5);
                    if (error_5 instanceof exception_1.Exception) {
                        return [2 /*return*/, res.status(error_5.status).json(error_5.message)];
                    }
                    res.status(type_1.HttpStatusCode.INTERNAL_SERVER).json(type_1.INTERNAL_SERVER_ERROR_MSG);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); },
    // LOGOUT
    logout: function (res) { return __awaiter(void 0, void 0, void 0, function () {
        var message, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, auth_1.default.logout(res)];
                case 1:
                    message = (_a.sent()).message;
                    res.status(type_1.HttpStatusCode.OK).json(message);
                    return [3 /*break*/, 3];
                case 2:
                    error_6 = _a.sent();
                    res.status(type_1.HttpStatusCode.INTERNAL_SERVER).json(type_1.INTERNAL_SERVER_ERROR_MSG);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); },
};
exports.default = authController;
