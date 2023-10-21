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
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var CRUDService = /** @class */ (function () {
    function CRUDService(model, nameService) {
        this.model = model;
        this.nameService = nameService;
    }
    // FIND ALL
    CRUDService.prototype.findAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var getAll, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.model.find()];
                    case 1:
                        getAll = _a.sent();
                        return [2 /*return*/, getAll];
                    case 2:
                        error_1 = _a.sent();
                        console.log(error_1);
                        throw new mongoose_1.Error("Occur error when find all ".concat(this.nameService, " with ").concat(error_1));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // SEARCH PAGINATION
    CRUDService.prototype.getPagination = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var pageIndex, pageSize, name_1, productId, comboPromotionsId, categoryId, types, cityId, districtId, wardId, fullName, from, to, role, filter, patternWithName, patternWithFullName, data, totalElement, totalPages, isLastPage, result, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        pageIndex = params.pageIndex, pageSize = params.pageSize, name_1 = params.name, productId = params.productId, comboPromotionsId = params.comboPromotionsId, categoryId = params.categoryId, types = params.types, cityId = params.cityId, districtId = params.districtId, wardId = params.wardId, fullName = params.fullName, from = params.from, to = params.to, role = params.role;
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
                            data: data,
                            totalElement: totalElement,
                            pageIndex: pageIndex,
                            pageSize: pageSize,
                            totalPage: totalPages,
                            isLastPage: isLastPage,
                        };
                        return [2 /*return*/, result];
                    case 3:
                        error_2 = _a.sent();
                        console.log(error_2);
                        throw new mongoose_1.Error("Occur error when fetching ".concat(this.nameService, " with ").concat(error_2));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // CREATE
    CRUDService.prototype.create = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var create, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        create = new this.model(req.body);
                        return [4 /*yield*/, create.save()];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        error_3 = _a.sent();
                        console.log(error_3);
                        throw new mongoose_1.Error("Occur error when create ".concat(this.nameService, " with ").concat(error_3));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // GET BY ID
    CRUDService.prototype.getById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var category, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.model.findById(id)];
                    case 1:
                        category = _a.sent();
                        return [2 /*return*/, category];
                    case 2:
                        error_4 = _a.sent();
                        console.log(error_4);
                        throw new mongoose_1.Error("Occur error when find by id ".concat(this.nameService, " with ").concat(error_4));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // UPDATE
    CRUDService.prototype.update = function (id, req) {
        return __awaiter(this, void 0, void 0, function () {
            var category, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.model.findByIdAndUpdate(id, req.body, { new: true })];
                    case 1:
                        category = _a.sent();
                        return [2 /*return*/, category];
                    case 2:
                        error_5 = _a.sent();
                        console.log(error_5);
                        throw new mongoose_1.Error("Occur error when update ".concat(this.nameService, " with ").concat(error_5));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // DELETE
    CRUDService.prototype.delete = function (ids) {
        return __awaiter(this, void 0, void 0, function () {
            var error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(typeof ids);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.model.deleteMany({
                                _id: {
                                    $in: ids, // $in operator: sẽ tìm bất kì những thằng nào trong database có _id match với nhứng thằng trong list id truyền vào ($in operator: nhận value[] or value)
                                },
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, { message: "Delete ".concat(this.nameService, " success") }];
                    case 3:
                        error_6 = _a.sent();
                        console.log(error_6);
                        throw new mongoose_1.Error("Occur error when update ".concat(this.nameService, " with ").concat(error_6));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return CRUDService;
}());
exports.default = CRUDService;
