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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var crudService_1 = __importDefault(require("@app/services/crudService"));
var product_1 = __importDefault(require("@app/models/product"));
var comboPromotions_1 = __importDefault(require("@app/models/comboPromotions"));
var type_1 = require("@app/exception/type");
var exception_1 = require("@app/exception");
var CategoryService = /** @class */ (function (_super) {
    __extends(CategoryService, _super);
    function CategoryService(model, nameService) {
        return _super.call(this, model, nameService) || this;
    }
    // CREATE CATEGORY
    CategoryService.prototype.createOverriding = function (req) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var requestFormData, newCategory, productIds, childrenCategory, i, element;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        requestFormData = ((_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.categoryInfo) ? JSON.parse((_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.categoryInfo) : {};
                        console.log('🚀 ~ file: category.ts:21 ~ CategoryService ~ createOverriding ~ requestFormData:', requestFormData);
                        newCategory = new this.model(requestFormData);
                        productIds = newCategory === null || newCategory === void 0 ? void 0 : newCategory.products;
                        childrenCategory = newCategory === null || newCategory === void 0 ? void 0 : newCategory.childrenCategory;
                        if (!(productIds === null || productIds === void 0 ? void 0 : productIds.length)) return [3 /*break*/, 2];
                        return [4 /*yield*/, product_1.default.updateMany({
                                _id: { $in: productIds },
                            }, { $set: { categoryId: newCategory._id } })];
                    case 1:
                        _c.sent();
                        _c.label = 2;
                    case 2:
                        if (childrenCategory === null || childrenCategory === void 0 ? void 0 : childrenCategory.length) {
                            for (i = 0; i < childrenCategory.length; i++) {
                                element = childrenCategory[i];
                                element.parentId = newCategory._id;
                            }
                        }
                        return [2 /*return*/, newCategory.save()];
                }
            });
        });
    };
    // UPDATE CATEGORY
    CategoryService.prototype.updateOverriding = function (id, req) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var requestFormData, childrenCategory, i, element;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        requestFormData = ((_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.categoryInfo) ? JSON.parse((_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.categoryInfo) : {};
                        childrenCategory = requestFormData.childCategory;
                        if (childrenCategory) {
                            for (i = 0; i < childrenCategory.length; i++) {
                                element = childrenCategory[i];
                                element.parentId = id;
                            }
                        }
                        return [4 /*yield*/, this.model.findByIdAndUpdate({ _id: id }, __assign(__assign({}, requestFormData), { childrenCategory: childrenCategory }), { new: true })];
                    case 1:
                        _c.sent();
                        return [2 /*return*/, { message: "Update ".concat(this.nameService, " success") }];
                }
            });
        });
    };
    CategoryService.prototype.getCategoryById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var category, exception;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.model
                            .findOne({
                            $or: [{ _id: id }, { 'childCategory._id': id }],
                        })
                            .populate(['products', "childrenCategory.category.products"])];
                    case 1:
                        category = _a.sent();
                        if (!category) {
                            exception = new exception_1.Exception(type_1.HttpStatusCode.NOT_FOUND, 'Not found category');
                            throw exception;
                        }
                        return [2 /*return*/, category];
                }
            });
        });
    };
    // DELETE CATEGORY
    CategoryService.prototype.deleteOverriding = function (ids) {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.model.deleteMany({ _id: { $in: ids } })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, product_1.default.updateMany({
                                categoryId: { $in: ids },
                            }, { $set: { categoryId: null } })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, comboPromotions_1.default.updateMany({
                                categoryId: { $in: ids },
                            }, {
                                $set: { categoryId: null },
                            })];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, { message: "Delete ".concat(this.nameService, " success") }];
                    case 4:
                        error_1 = _a.sent();
                        console.log(error_1);
                        throw new Error("Occur error when delete ".concat(this.nameService, " with ").concat(error_1));
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return CategoryService;
}(crudService_1.default));
exports.default = CategoryService;
