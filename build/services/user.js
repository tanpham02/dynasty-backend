"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var crudService_1 = __importDefault(require("./crudService"));
var bcrypt_1 = require("bcrypt");
var constants_1 = require("@app/constants");
var configs_1 = require("@app/configs");
var APP_URL = (0, configs_1.configApp)().APP_URL;
var UserService = /** @class */ (function (_super) {
    __extends(UserService, _super);
    function UserService(model, nameService) {
        return _super.call(this, model, nameService) || this;
    }
    // SEARCH PAGINATION
    UserService.prototype.getPaginationOverriding = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var pageIndex, pageSize, name_1, productId, comboPromotionsId, categoryId, types, cityId, districtId, wardId, fullName, role, filter, patternWithName, patternWithFullName, data, totalElement, totalPages, isLastPage, result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        pageIndex = params.pageIndex, pageSize = params.pageSize, name_1 = params.name, productId = params.productId, comboPromotionsId = params.comboPromotionsId, categoryId = params.categoryId, types = params.types, cityId = params.cityId, districtId = params.districtId, wardId = params.wardId, fullName = params.fullName, role = params.role;
                        filter = {};
                        if (name_1) {
                            patternWithName = { $regex: new RegExp(name_1, 'gi') };
                            filter.name = patternWithName;
                        }
                        if (productId) {
                            filter.productIds = productId;
                        }
                        if (comboPromotionsId) {
                            filter.comboPromotionsId = comboPromotionsId;
                        }
                        if (categoryId) {
                            filter.categoryId = categoryId;
                        }
                        if (types) {
                            filter.types = { $all: types === null || types === void 0 ? void 0 : types.split(',') };
                        }
                        if (cityId) {
                            filter.cityId = cityId;
                        }
                        if (districtId) {
                            filter.districtId = districtId;
                        }
                        if (wardId) {
                            filter.wardId = wardId;
                        }
                        if (fullName) {
                            patternWithFullName = { $regex: new RegExp(fullName, 'gi') };
                            filter.fullName = patternWithFullName;
                        }
                        if (role) {
                            filter.role = role;
                        }
                        return [4 /*yield*/, this.model
                                .find(filter)
                                .limit(pageSize)
                                .skip(pageSize * pageIndex)];
                    case 1:
                        data = _a.sent();
                        return [4 /*yield*/, this.model.find(filter).count()];
                    case 2:
                        totalElement = _a.sent();
                        totalPages = Math.ceil(totalElement / pageSize);
                        isLastPage = pageIndex + 1 >= totalPages;
                        result = {
                            data: data.map(function (item) {
                                var _a = item.toObject(), password = _a.password, remainingUser = __rest(_a, ["password"]);
                                return remainingUser;
                            }),
                            totalElement: totalElement,
                            pageIndex: pageIndex,
                            pageSize: pageSize,
                            totalPage: totalPages,
                            isLastPage: isLastPage,
                        };
                        return [2 /*return*/, result];
                    case 3:
                        error_1 = _a.sent();
                        console.log(error_1);
                        throw new Error("Occur error when fetching ".concat(this.nameService, " with ").concat(error_1));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // CREATE
    UserService.prototype.createOverriding = function (req) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var _c, password, user, filename, destination, salt, passwordAfterHash, newUser, _d, pw, restUser, error_2;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _c = JSON.parse(req.body.userInfo), password = _c.password, user = __rest(_c, ["password"]);
                        filename = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
                        destination = (_b = req.file) === null || _b === void 0 ? void 0 : _b.destination;
                        if (filename && destination) {
                            user.image = "".concat(APP_URL, "/").concat(destination, "/").concat(filename);
                        }
                        _e.label = 1;
                    case 1:
                        _e.trys.push([1, 6, , 7]);
                        if (!password) return [3 /*break*/, 5];
                        return [4 /*yield*/, (0, bcrypt_1.genSalt)(constants_1.SALT)];
                    case 2:
                        salt = _e.sent();
                        return [4 /*yield*/, (0, bcrypt_1.hash)(password, salt)];
                    case 3:
                        passwordAfterHash = _e.sent();
                        newUser = new this.model(__assign(__assign({}, user), { password: passwordAfterHash }));
                        return [4 /*yield*/, newUser.save()];
                    case 4:
                        _e.sent();
                        _d = newUser.toObject(), pw = _d.password, restUser = __rest(_d, ["password"]);
                        return [2 /*return*/, restUser];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_2 = _e.sent();
                        console.log('error', error_2);
                        throw new Error("Occur when create ".concat(this.nameService));
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    // UPDATE
    UserService.prototype.updateOverriding = function (id, req) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function () {
            var dataUpdate, filename, destination, newDataUpdate, salt, passwordAfterHash, error_3;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        dataUpdate = ((_a = req.body) === null || _a === void 0 ? void 0 : _a.userInfo) ? JSON.parse((_b = req.body) === null || _b === void 0 ? void 0 : _b.userInfo) : {};
                        filename = (_c = req === null || req === void 0 ? void 0 : req.file) === null || _c === void 0 ? void 0 : _c.filename;
                        destination = (_d = req === null || req === void 0 ? void 0 : req.file) === null || _d === void 0 ? void 0 : _d.destination;
                        newDataUpdate = {};
                        if (Object.keys(dataUpdate).length) {
                            newDataUpdate = __assign({}, dataUpdate);
                        }
                        if (filename && destination) {
                            newDataUpdate.image = "".concat(APP_URL, "/").concat(destination, "/").concat(filename);
                        }
                        _e.label = 1;
                    case 1:
                        _e.trys.push([1, 6, , 7]);
                        if (!(newDataUpdate === null || newDataUpdate === void 0 ? void 0 : newDataUpdate.password)) return [3 /*break*/, 4];
                        return [4 /*yield*/, (0, bcrypt_1.genSalt)(constants_1.SALT)];
                    case 2:
                        salt = _e.sent();
                        return [4 /*yield*/, (0, bcrypt_1.hash)(newDataUpdate === null || newDataUpdate === void 0 ? void 0 : newDataUpdate.password, salt)];
                    case 3:
                        passwordAfterHash = _e.sent();
                        newDataUpdate.password = passwordAfterHash;
                        _e.label = 4;
                    case 4: return [4 /*yield*/, this.model.findByIdAndUpdate(id, newDataUpdate, { new: true })];
                    case 5:
                        _e.sent();
                        return [2 /*return*/, { message: "Update ".concat(this.nameService, " success") }];
                    case 6:
                        error_3 = _e.sent();
                        throw new Error("Occur when create ".concat(this.nameService));
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    // GET BY ID
    UserService.prototype.getByIdOverriding = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var user, _a, password, remainingUser, error_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.model.findById(id)];
                    case 1:
                        user = _b.sent();
                        if (user) {
                            _a = user === null || user === void 0 ? void 0 : user.toObject(), password = _a.password, remainingUser = __rest(_a, ["password"]);
                            return [2 /*return*/, remainingUser];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _b.sent();
                        throw new Error("Occur when create ".concat(this.nameService));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return UserService;
}(crudService_1.default));
exports.default = UserService;
