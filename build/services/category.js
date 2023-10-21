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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var crudService_1 = __importDefault(require("@app/services/crudService"));
var product_1 = __importDefault(require("@app/models/product"));
var comboPromotions_1 = __importDefault(require("@app/models/comboPromotions"));
var iter_ops_1 = require("iter-ops");
var CategoryService = /** @class */ (function (_super) {
    __extends(CategoryService, _super);
    function CategoryService(model, nameService) {
        return _super.call(this, model, nameService) || this;
    }
    // CREATE CATEGORY
    CategoryService.prototype.createOverriding = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var newCategory, listProductId, childrenCategory, i, element, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        newCategory = new this.model(req.body);
                        listProductId = newCategory.productsDTO;
                        childrenCategory = newCategory.childCategory;
                        if (!(listProductId === null || listProductId === void 0 ? void 0 : listProductId.length)) return [3 /*break*/, 2];
                        return [4 /*yield*/, product_1.default.updateMany({
                                _id: { $in: listProductId },
                            }, { $set: { categoryId: newCategory._id } })];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (childrenCategory) {
                            for (i = 0; i < childrenCategory.length; i++) {
                                element = childrenCategory[i];
                                element.parentId = newCategory._id;
                            }
                        }
                        return [2 /*return*/, newCategory.save()];
                    case 3:
                        error_1 = _a.sent();
                        console.log(error_1);
                        throw new Error("Occur error when delete ".concat(this.nameService, " with ").concat(error_1));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // CREATE CATEGORY
    CategoryService.prototype.updateOverriding = function (id, req) {
        return __awaiter(this, void 0, void 0, function () {
            var childrenCategory, i, element, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        childrenCategory = req.body.childCategory;
                        if (childrenCategory) {
                            for (i = 0; i < childrenCategory.length; i++) {
                                element = childrenCategory[i];
                                element.parentId = id;
                            }
                        }
                        return [4 /*yield*/, this.model.findByIdAndUpdate({ _id: id }, __assign(__assign({}, req.body), { childrenCategory: childrenCategory }), { new: true })];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        error_2 = _a.sent();
                        console.log(error_2);
                        throw new Error("Occur error when update ".concat(this.nameService, " with ").concat(error_2));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // DELETE CATEGORY
    CategoryService.prototype.deleteOverriding = function (ids) {
        return __awaiter(this, void 0, void 0, function () {
            var error_3;
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
                        error_3 = _a.sent();
                        console.log(error_3);
                        throw new Error("Occur error when delete ".concat(this.nameService, " with ").concat(error_3));
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    // GET CHILDREN CATEGORY BY ID
    CategoryService.prototype.getChildrenCategoryById = function (childCategoryId) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var childrenCategory, result, error_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.model
                                .findOne({
                                childCategory: { $elemMatch: { _id: childCategoryId } },
                            })
                                .populate('childCategory.children.productsDTO')];
                    case 1:
                        childrenCategory = _b.sent();
                        result = (_a = childrenCategory === null || childrenCategory === void 0 ? void 0 : childrenCategory.childCategory) === null || _a === void 0 ? void 0 : _a.find(function (child) { return String(child._id) === childCategoryId; });
                        return [2 /*return*/, result];
                    case 2:
                        error_4 = _b.sent();
                        console.log(error_4);
                        throw new Error("Occur error when find by id ".concat(this.nameService, " with ").concat(error_4));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // GET CATEGORY BY ID
    CategoryService.prototype.getCategoryById = function (id, populateName) {
        return __awaiter(this, void 0, void 0, function () {
            var category, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.model
                                .findOne({
                                $or: [{ _id: id }, { 'childCategory._id': id }],
                            })
                                .populate(['productsDTO', 'childCategory.children.productsDTO'])];
                    case 1:
                        category = _a.sent();
                        return [2 /*return*/, category];
                    case 2:
                        error_5 = _a.sent();
                        console.log(error_5);
                        throw new Error("Occur error when find by id ".concat(this.nameService, " with ").concat(error_5));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // DELETE CHILDREN CATEGORY
    CategoryService.prototype.deleteChildCategoryOverriding = function (parentCategoryId, childCategoryId) {
        return __awaiter(this, void 0, void 0, function () {
            var error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.model.updateOne({ _id: parentCategoryId }, { $pull: { childCategory: { _id: { $in: childCategoryId } } } })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, product_1.default.updateMany({
                                categoryId: childCategoryId,
                            }, { $set: { categoryId: null } })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, { message: "Delete children category success" }];
                    case 3:
                        error_6 = _a.sent();
                        console.log(error_6);
                        throw new Error("Occur error when delete children category with ".concat(error_6));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // UPDATE CHILDREN CATEGORY
    CategoryService.prototype.updateChildrenCategory = function (childCategoryId, req) {
        return __awaiter(this, void 0, void 0, function () {
            var error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.model.findOneAndUpdate({
                                'childCategory._id': childCategoryId,
                            }, {
                                $set: {
                                    'childCategory.$.children': req.body.children,
                                },
                            }, {
                                new: true,
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        error_7 = _a.sent();
                        console.log(error_7);
                        throw new Error("Occur error when update children ".concat(this.nameService, " with ").concat(error_7));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // ADD CHILDREN CATEGORY
    CategoryService.prototype.addChildrenCategory = function (parentCategoryId, req) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var category, data, categoryId, productListId, error_8;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 6, , 7]);
                        console.log('body', req.body);
                        return [4 /*yield*/, this.model.findById({ _id: parentCategoryId })];
                    case 1:
                        category = _d.sent();
                        data = {
                            children: __assign({}, (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.children),
                            parentId: parentCategoryId,
                        };
                        return [4 /*yield*/, ((_b = category === null || category === void 0 ? void 0 : category.childCategory) === null || _b === void 0 ? void 0 : _b.push(data))];
                    case 2:
                        _d.sent();
                        return [4 /*yield*/, (category === null || category === void 0 ? void 0 : category.save())];
                    case 3:
                        _d.sent();
                        categoryId = (_c = category === null || category === void 0 ? void 0 : category.childCategory) === null || _c === void 0 ? void 0 : _c[(category === null || category === void 0 ? void 0 : category.childCategory.length) - 1]._id;
                        productListId = req.body.productsDTO;
                        if (!productListId) return [3 /*break*/, 5];
                        return [4 /*yield*/, product_1.default.updateMany({
                                _id: { $in: productListId },
                            }, {
                                $set: {
                                    categoryId: categoryId,
                                },
                            })];
                    case 4:
                        _d.sent();
                        _d.label = 5;
                    case 5: return [2 /*return*/, { message: "Add children category success" }];
                    case 6:
                        error_8 = _d.sent();
                        console.log(error_8);
                        throw new Error("Occur error when add children category with ".concat(error_8));
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    // SEARCH PAGINATION TO SHOW (PRODUCT)
    CategoryService.prototype.searchPaginationToShowProduct = function (id, pageIndex, pageSize) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var category, childCategory, listProduct, newMapListProductId, i, element, product, result, totalPage, error_9;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, this.model.findById(id)];
                    case 1:
                        category = _d.sent();
                        childCategory = category === null || category === void 0 ? void 0 : category.childCategory;
                        listProduct = [];
                        newMapListProductId = [];
                        if (!((_a = category === null || category === void 0 ? void 0 : category.productsDTO) === null || _a === void 0 ? void 0 : _a.length) && childCategory.length) {
                            newMapListProductId = (_b = childCategory
                                .map(function (item) {
                                var _a, _b, _c;
                                if ((_b = (_a = item === null || item === void 0 ? void 0 : item.children) === null || _a === void 0 ? void 0 : _a.productsDTO) === null || _b === void 0 ? void 0 : _b.length) {
                                    return __spreadArray([], (_c = item === null || item === void 0 ? void 0 : item.children) === null || _c === void 0 ? void 0 : _c.productsDTO, true);
                                }
                            })) === null || _b === void 0 ? void 0 : _b.flatMap(function (item) { return item; });
                        }
                        if (((_c = category === null || category === void 0 ? void 0 : category.productsDTO) === null || _c === void 0 ? void 0 : _c.length) && !childCategory.length) {
                            newMapListProductId = category === null || category === void 0 ? void 0 : category.productsDTO;
                        }
                        i = 0;
                        _d.label = 2;
                    case 2:
                        if (!(i < newMapListProductId.length)) return [3 /*break*/, 5];
                        element = newMapListProductId[i];
                        return [4 /*yield*/, product_1.default.findById(element)];
                    case 3:
                        product = _d.sent();
                        listProduct.push(product);
                        _d.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 2];
                    case 5:
                        result = (0, iter_ops_1.pipe)(listProduct === null || listProduct === void 0 ? void 0 : listProduct.sort(function (a, b) { return a.price + b.price; }), (0, iter_ops_1.skip)(pageSize * pageIndex), (0, iter_ops_1.page)(pageSize)).first;
                        totalPage = Math.ceil(newMapListProductId.length / pageSize);
                        return [2 /*return*/, {
                                data: result,
                                pageIndex: pageIndex,
                                pageSize: pageSize,
                                totalPage: totalPage,
                                totalElement: newMapListProductId.length,
                                isLastPage: pageIndex + 1 >= totalPage,
                            }];
                    case 6:
                        error_9 = _d.sent();
                        throw new Error("Occur error when retries ".concat(this.nameService));
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    return CategoryService;
}(crudService_1.default));
exports.default = CategoryService;
