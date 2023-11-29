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
Object.defineProperty(exports, "__esModule", { value: true });
var type_1 = require("@app/exception/type");
var exception_1 = require("@app/exception");
var CRUDService = /** @class */ (function () {
    function CRUDService(model, nameService) {
        this.model = model;
        this.nameService = nameService;
    }
    // FIND ALL
    CRUDService.prototype.findAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var getAll;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.model.find()];
                    case 1:
                        getAll = _a.sent();
                        return [2 /*return*/, getAll];
                }
            });
        });
    };
    // SEARCH PAGINATION
    CRUDService.prototype.getPagination = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var pageIndex, pageSize, name, productId, comboPromotionsId, categoryId, types, cityId, districtId, wardId, fullName, from, to, role, filter, patternWithName, patternWithFullName, data, totalElement, totalPages, isLastPage, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pageIndex = params.pageIndex, pageSize = params.pageSize, name = params.name, productId = params.productId, comboPromotionsId = params.comboPromotionsId, categoryId = params.categoryId, types = params.types, cityId = params.cityId, districtId = params.districtId, wardId = params.wardId, fullName = params.fullName, from = params.from, to = params.to, role = params.role;
                        filter = {};
                        if (name) {
                            patternWithName = { $regex: new RegExp(name, 'gi') };
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
                        if (from && to) {
                            filter.createdAt = { $gte: from, $lte: to };
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
                            data: data,
                            totalElement: totalElement,
                            pageIndex: pageIndex,
                            pageSize: pageSize,
                            totalPage: totalPages,
                            isLastPage: isLastPage,
                        };
                        return [2 /*return*/, result];
                }
            });
        });
    };
    // SEARCH PAGINATION (EXCLUDE PASSWORD)
    CRUDService.prototype.getPaginationExcludePw = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var getDataPagination, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getPagination(params)];
                    case 1:
                        getDataPagination = _a.sent();
                        result = __assign(__assign({}, getDataPagination), { data: getDataPagination.data.length > 0
                                ? getDataPagination.data.map(function (item) {
                                    var _a = item.toObject(), password = _a.password, remainingUser = __rest(_a, ["password"]);
                                    return remainingUser;
                                })
                                : [] });
                        return [2 /*return*/, result];
                }
            });
        });
    };
    // CREATE
    CRUDService.prototype.create = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var create;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        create = new this.model(req.body);
                        return [4 /*yield*/, create.save()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // GET BY ID
    CRUDService.prototype.getById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var response, exception;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.model.findById(id)];
                    case 1:
                        response = _a.sent();
                        if (!response) {
                            exception = new exception_1.Exception(type_1.HttpStatusCode.NOT_FOUND, "".concat(this.nameService, " not found!"));
                            throw exception;
                        }
                        return [2 /*return*/, response];
                }
            });
        });
    };
    // UPDATE
    CRUDService.prototype.update = function (id, req) {
        return __awaiter(this, void 0, void 0, function () {
            var isUserAlreadyExist, exception;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getById(id)];
                    case 1:
                        isUserAlreadyExist = _a.sent();
                        if (!isUserAlreadyExist) {
                            exception = new exception_1.Exception(type_1.HttpStatusCode.NOT_FOUND, "".concat(this.nameService, " not found!"));
                            throw exception;
                        }
                        return [4 /*yield*/, this.model.findByIdAndUpdate(id, req.body, { new: true })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, { message: "Update ".concat(this.nameService, " success") }];
                }
            });
        });
    };
    // DELETE
    CRUDService.prototype.delete = function (ids) {
        return __awaiter(this, void 0, void 0, function () {
            var exception;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!ids) {
                            exception = new exception_1.Exception(type_1.HttpStatusCode.BAD_REQUEST, "ids field can't be empty");
                            throw exception;
                        }
                        return [4 /*yield*/, this.model.deleteMany({
                                _id: {
                                    $in: ids, // $in operator: sẽ tìm bất kì những thằng nào trong database có _id match với nhứng thằng trong list id truyền vào ($in operator: nhận value[] or value)
                                },
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, { message: "Delete ".concat(this.nameService, " success") }];
                }
            });
        });
    };
    return CRUDService;
}());
exports.default = CRUDService;
