"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var configs_1 = require("@app/configs");
var user_1 = __importDefault(require("@app/models/user"));
var bcrypt_1 = require("bcrypt");
var constants_1 = require("@app/constants");
var jsonwebtoken_1 = require("jsonwebtoken");
var bcrypt_2 = require("bcrypt");
var customer_1 = __importDefault(require("@app/models/customer"));
var jwt_1 = __importDefault(require("@app/middlewares/jwt"));
var cart_1 = __importDefault(require("@app/models/cart"));
var customerAddress_1 = __importDefault(require("@app/models/customerAddress"));
var exception_1 = require("@app/exception");
var type_1 = require("@app/exception/type");
var jwtRefreshKey = (0, configs_1.configApp)().jwtRefreshKey;
var authService = {
    // SIGNUP CUSTOMER
    signup: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, password, customerBody, existCustomer, exception, exception, salt, passwordAfterHash, newCustomer, newCart, newCustomerAddress;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, password = _a.password, customerBody = __rest(_a, ["password"]);
                    return [4 /*yield*/, customer_1.default.findOne({
                            $or: [
                                {
                                    phoneNumber: customerBody.phoneNumber,
                                },
                                {
                                    email: customerBody.email,
                                },
                            ],
                        })];
                case 1:
                    existCustomer = _b.sent();
                    if (existCustomer) {
                        if (existCustomer.phoneNumber === customerBody.phoneNumber) {
                            exception = new exception_1.Exception(type_1.HttpStatusCode.CONFLICT, 'PhoneNumber already exist');
                            throw exception;
                        }
                        if (existCustomer.email === customerBody.email) {
                            exception = new exception_1.Exception(type_1.HttpStatusCode.CONFLICT, 'Email already exists');
                            throw exception;
                        }
                    }
                    if (!password) return [3 /*break*/, 7];
                    return [4 /*yield*/, (0, bcrypt_2.genSalt)(constants_1.SALT)];
                case 2:
                    salt = _b.sent();
                    return [4 /*yield*/, (0, bcrypt_2.hash)(password, salt)];
                case 3:
                    passwordAfterHash = _b.sent();
                    newCustomer = new customer_1.default(__assign(__assign({}, customerBody), { password: passwordAfterHash }));
                    return [4 /*yield*/, newCustomer.save()];
                case 4:
                    _b.sent();
                    newCart = new cart_1.default({ customerId: newCustomer._id });
                    newCustomerAddress = new customerAddress_1.default({ customerId: newCustomer._id });
                    return [4 /*yield*/, newCustomerAddress.save()];
                case 5:
                    _b.sent();
                    return [4 /*yield*/, newCart.save()];
                case 6:
                    _b.sent();
                    _b.label = 7;
                case 7: return [2 /*return*/, { message: 'Đăng ký thành công' }];
            }
        });
    }); },
    // LOGIN FOR USER
    loginUser: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, username, password, user, exception, validPassword, exception, userJwt, accessToken, refreshToken, _b, password_1, remainingUser;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _a = req.body, username = _a.username, password = _a.password;
                    return [4 /*yield*/, user_1.default.findOne({ username: username })];
                case 1:
                    user = _c.sent();
                    if (!user) {
                        exception = new exception_1.Exception(type_1.HttpStatusCode.NOT_FOUND, 'username no exist');
                        throw exception;
                    }
                    if (!(password && (user === null || user === void 0 ? void 0 : user.password))) return [3 /*break*/, 3];
                    return [4 /*yield*/, (0, bcrypt_1.compare)(password, user === null || user === void 0 ? void 0 : user.password)];
                case 2:
                    validPassword = _c.sent();
                    if (!validPassword) {
                        exception = new exception_1.Exception(type_1.HttpStatusCode.UN_AUTHORIZED, 'Wrong password');
                        throw exception;
                    }
                    if (user && validPassword) {
                        userJwt = new jwt_1.default(user._id, user.role);
                        accessToken = userJwt.generateAccessToken();
                        refreshToken = userJwt.generateRefreshToken();
                        res.cookie('refreshToken', refreshToken, {
                            httpOnly: true,
                            secure: process.env.NODE_ENV === constants_1.MODE.PRODUCTION,
                            sameSite: true,
                        });
                        _b = user.toObject(), password_1 = _b.password, remainingUser = __rest(_b, ["password"]);
                        return [2 /*return*/, {
                                user: remainingUser,
                                accessToken: accessToken,
                                refreshToken: refreshToken,
                            }];
                    }
                    _c.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    }); },
    // LOGIN FOR CUSTOMER
    loginCustomer: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, phoneNumber, password, customer, exception, validPassword, exception, customerJwt, accessToken, refreshToken, _b, password_2, remainingCustomer;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _a = req.body, phoneNumber = _a.phoneNumber, password = _a.password;
                    return [4 /*yield*/, customer_1.default.findOne({ phoneNumber: phoneNumber })];
                case 1:
                    customer = _c.sent();
                    if (!customer) {
                        exception = new exception_1.Exception(type_1.HttpStatusCode.NOT_FOUND, 'Not found customer with this phone number');
                        throw exception;
                    }
                    if (!(password && (customer === null || customer === void 0 ? void 0 : customer.password))) return [3 /*break*/, 3];
                    return [4 /*yield*/, (0, bcrypt_1.compare)(password, customer === null || customer === void 0 ? void 0 : customer.password)];
                case 2:
                    validPassword = _c.sent();
                    if (!validPassword) {
                        exception = new exception_1.Exception(type_1.HttpStatusCode.UN_AUTHORIZED, 'Wrong password');
                        throw exception;
                    }
                    if (customer && validPassword) {
                        customerJwt = new jwt_1.default(customer._id);
                        accessToken = customerJwt.generateAccessToken();
                        refreshToken = customerJwt.generateRefreshToken();
                        res.cookie('refreshToken', refreshToken, {
                            httpOnly: true,
                            secure: process.env.NODE_ENV === constants_1.MODE.PRODUCTION,
                            sameSite: true,
                        });
                        _b = customer.toObject(), password_2 = _b.password, remainingCustomer = __rest(_b, ["password"]);
                        return [2 /*return*/, {
                                customer: remainingCustomer,
                                accessToken: accessToken,
                                refreshToken: refreshToken,
                            }];
                    }
                    _c.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    }); },
    // REQUEST REFRESH TOKEN FOR USER
    requestRefreshTokenForUser: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var refreshTokenCookie, exception, newAccessTk;
        var _a;
        return __generator(this, function (_b) {
            refreshTokenCookie = ((_a = req.cookies) === null || _a === void 0 ? void 0 : _a.refreshToken) || '';
            if (!refreshTokenCookie) {
                exception = new exception_1.Exception(type_1.HttpStatusCode.NOT_FOUND, "You're not authenticated");
                throw exception;
            }
            newAccessTk = (0, jsonwebtoken_1.verify)(refreshTokenCookie, jwtRefreshKey || '', function (err, _user) {
                if (err) {
                    console.log('🚀 ~ file: auth.ts:173 ~ verify ~ err:', err);
                    var exception = new exception_1.Exception((req === null || req === void 0 ? void 0 : req.statusCode) || 0, err === null || err === void 0 ? void 0 : err.message);
                    throw exception;
                }
                var userJwt = new jwt_1.default(_user._id, _user.role);
                var newAccessToken = userJwt.generateAccessToken();
                var newRefreshToken = userJwt.generateRefreshToken();
                res.cookie('refreshToken', newRefreshToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === constants_1.MODE.PRODUCTION,
                    sameSite: true,
                });
                return newAccessToken;
            });
            return [2 /*return*/, {
                    accessToken: newAccessTk,
                }];
        });
    }); },
    // REQUEST REFRESH TOKEN FOR CUSTOMER
    requestRefreshTokenForCustomer: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var refreshTokenCookie, exception, newAccessTk;
        var _a;
        return __generator(this, function (_b) {
            refreshTokenCookie = ((_a = req.cookies) === null || _a === void 0 ? void 0 : _a.refreshToken) || '';
            if (!refreshTokenCookie) {
                exception = new exception_1.Exception(type_1.HttpStatusCode.NOT_FOUND, "You're not authenticated");
                throw exception;
            }
            newAccessTk = (0, jsonwebtoken_1.verify)(refreshTokenCookie, jwtRefreshKey || '', function (err, _customer) {
                if (err) {
                    console.log('🚀 ~ file: auth.ts:173 ~ verify ~ err:', err);
                    var exception = new exception_1.Exception((req === null || req === void 0 ? void 0 : req.statusCode) || 0, err === null || err === void 0 ? void 0 : err.message);
                    throw exception;
                }
                var customerJwt = new jwt_1.default(_customer._id);
                var newAccessToken = customerJwt.generateAccessToken();
                var newRefreshToken = customerJwt.generateRefreshToken();
                res.cookie('refreshToken', newRefreshToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === constants_1.MODE.PRODUCTION,
                    sameSite: true,
                });
                return newAccessToken;
            });
            return [2 /*return*/, { accessToken: newAccessTk }];
        });
    }); },
    // LOGOUT
    logout: function (res) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            res.clearCookie('refreshToken');
            return [2 /*return*/, { message: 'Logout success' }];
        });
    }); },
};
exports.default = authService;
