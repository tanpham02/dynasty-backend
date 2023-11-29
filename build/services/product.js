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
var crudService_1 = __importDefault(require("./crudService"));
var productVariant_1 = __importDefault(require("@app/models/productVariant"));
var category_1 = __importDefault(require("@app/models/category"));
var configs_1 = require("@app/configs");
var APP_URL = (0, configs_1.configApp)().APP_URL;
var ProductService = /** @class */ (function (_super) {
    __extends(ProductService, _super);
    function ProductService(model, nameService) {
        return _super.call(this, model, nameService) || this;
    }
    // DELETE
    ProductService.prototype.deleteOverriding = function (ids) {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, this.model.deleteMany({ _id: { $in: ids } })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, productVariant_1.default.updateMany({
                                productIds: { $in: ids },
                            }, { $pull: { productIds: { $in: ids } } })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, category_1.default.updateMany({
                                productsDTO: { $in: ids },
                            }, { $pull: { productsDTO: { $in: ids } } })];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, category_1.default.updateMany({
                                'childCategory.children.productsDTO': { $in: ids },
                            }, {
                                $pull: {
                                    'childCategory.$.children.productsDTO': { $in: ids },
                                },
                            }, {
                                new: true,
                            })];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, { message: "Delete ".concat(this.nameService, " success") }];
                    case 5:
                        error_1 = _a.sent();
                        console.log(error_1);
                        //throw new Error(`Occur error when delete ${this.nameService} with ${error}`); // on develop backend
                        return [2 /*return*/, error_1];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    // CREATE
    ProductService.prototype.createOverriding = function (req) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var product, filename, destination, newProduct, productVariantId, categoryId, productVariant, category, categoryChild, error_2;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        product = JSON.parse(req.body.productInfo);
                        filename = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
                        destination = (_b = req.file) === null || _b === void 0 ? void 0 : _b.destination;
                        if (filename && destination) {
                            product.image = "".concat(APP_URL, "/").concat(destination, "/").concat(filename);
                        }
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 12, , 13]);
                        newProduct = new this.model(__assign({}, product));
                        productVariantId = product.productVariantId;
                        categoryId = product.categoryId;
                        if (!productVariantId) return [3 /*break*/, 4];
                        return [4 /*yield*/, productVariant_1.default.findById(productVariantId)];
                    case 2:
                        productVariant = _c.sent();
                        return [4 /*yield*/, (productVariant === null || productVariant === void 0 ? void 0 : productVariant.updateOne({ $push: { productIds: newProduct._id } }))];
                    case 3:
                        _c.sent();
                        _c.label = 4;
                    case 4:
                        if (!categoryId) return [3 /*break*/, 10];
                        return [4 /*yield*/, category_1.default.findById(categoryId)];
                    case 5:
                        category = _c.sent();
                        return [4 /*yield*/, category_1.default.findOne({ 'childCategory._id': categoryId })];
                    case 6:
                        categoryChild = _c.sent();
                        if (!category) return [3 /*break*/, 8];
                        return [4 /*yield*/, (category === null || category === void 0 ? void 0 : category.updateOne({ $push: { productsDTO: newProduct._id } }))];
                    case 7:
                        _c.sent();
                        _c.label = 8;
                    case 8:
                        if (!categoryChild) return [3 /*break*/, 10];
                        return [4 /*yield*/, category_1.default.findOneAndUpdate({
                                'childCategory._id': categoryId,
                            }, {
                                $push: {
                                    'childCategory.$.children.productsDTO': newProduct._id,
                                },
                            }, {
                                new: true,
                            })];
                    case 9:
                        _c.sent();
                        _c.label = 10;
                    case 10: return [4 /*yield*/, newProduct.save()];
                    case 11: return [2 /*return*/, _c.sent()];
                    case 12:
                        error_2 = _c.sent();
                        console.log(error_2);
                        // throw new Error(`Occur error when delete ${this.nameService} with ${error}`); // on develop backend
                        return [2 /*return*/, error_2];
                    case 13: return [2 /*return*/];
                }
            });
        });
    };
    // UPDATE
    ProductService.prototype.updateOverriding = function (id, req) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function () {
            var productRequest, filename, destination, dataUpdate, product, productVariantId, categoryId, categoryChild, error_3, error_4, error_5, error_6;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        productRequest = ((_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.productInfo)
                            ? JSON.parse((_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.productInfo)
                            : {};
                        filename = (_c = req === null || req === void 0 ? void 0 : req.file) === null || _c === void 0 ? void 0 : _c.filename;
                        destination = (_d = req === null || req === void 0 ? void 0 : req.file) === null || _d === void 0 ? void 0 : _d.destination;
                        dataUpdate = {};
                        if (Object.keys(productRequest).length > 0) {
                            dataUpdate = __assign(__assign({}, dataUpdate), productRequest);
                        }
                        _e.label = 1;
                    case 1:
                        _e.trys.push([1, 21, , 22]);
                        if (filename && destination) {
                            dataUpdate.image = "".concat(APP_URL, "/").concat(destination, "/").concat(filename);
                        }
                        return [4 /*yield*/, this.model.findOneAndUpdate({ _id: id }, dataUpdate, { new: true })];
                    case 2:
                        product = _e.sent();
                        productVariantId = dataUpdate === null || dataUpdate === void 0 ? void 0 : dataUpdate.productVariantId;
                        categoryId = dataUpdate === null || dataUpdate === void 0 ? void 0 : dataUpdate.categoryId;
                        return [4 /*yield*/, category_1.default.findOne({ 'childCategory._id': categoryId })];
                    case 3:
                        categoryChild = _e.sent();
                        if (!(productVariantId &&
                            new Object(product === null || product === void 0 ? void 0 : product.productVariantId).valueOf() !== productVariantId)) return [3 /*break*/, 8];
                        _e.label = 4;
                    case 4:
                        _e.trys.push([4, 7, , 8]);
                        return [4 /*yield*/, productVariant_1.default.findByIdAndUpdate({ _id: product === null || product === void 0 ? void 0 : product.productVariantId }, {
                                $pull: { productIds: product === null || product === void 0 ? void 0 : product._id },
                            }, { new: true })];
                    case 5:
                        _e.sent();
                        return [4 /*yield*/, productVariant_1.default.findByIdAndUpdate({ _id: productVariantId }, {
                                $push: { productIds: product === null || product === void 0 ? void 0 : product._id },
                            }, { new: true })];
                    case 6:
                        _e.sent();
                        return [3 /*break*/, 8];
                    case 7:
                        error_3 = _e.sent();
                        console.log(error_3);
                        return [3 /*break*/, 8];
                    case 8:
                        if (!(categoryId && new Object(product === null || product === void 0 ? void 0 : product.categoryId).valueOf() !== categoryId)) return [3 /*break*/, 14];
                        console.log('category id');
                        _e.label = 9;
                    case 9:
                        _e.trys.push([9, 13, , 14]);
                        return [4 /*yield*/, category_1.default.findByIdAndUpdate({ _id: product === null || product === void 0 ? void 0 : product.categoryId }, {
                                $pull: { productsDTO: product === null || product === void 0 ? void 0 : product._id },
                            }, { new: true })];
                    case 10:
                        _e.sent();
                        return [4 /*yield*/, category_1.default.findByIdAndUpdate(categoryId, {
                                $push: { productsDTO: product === null || product === void 0 ? void 0 : product._id },
                            }, { new: true })];
                    case 11:
                        _e.sent();
                        return [4 /*yield*/, category_1.default.findOneAndUpdate({
                                'childCategory._id': product === null || product === void 0 ? void 0 : product.categoryId,
                            }, {
                                $pull: {
                                    'childCategory.$.children.productsDTO': product === null || product === void 0 ? void 0 : product._id,
                                },
                            }, {
                                new: true,
                            })];
                    case 12:
                        _e.sent();
                        return [3 /*break*/, 14];
                    case 13:
                        error_4 = _e.sent();
                        console.log(error_4);
                        return [3 /*break*/, 14];
                    case 14:
                        if (!(categoryChild && new Object(product === null || product === void 0 ? void 0 : product.categoryId).valueOf() !== categoryChild)) return [3 /*break*/, 20];
                        _e.label = 15;
                    case 15:
                        _e.trys.push([15, 19, , 20]);
                        return [4 /*yield*/, category_1.default.findOneAndUpdate({
                                'childCategory._id': product === null || product === void 0 ? void 0 : product.categoryId,
                            }, {
                                $pull: {
                                    'childCategory.$.children.productsDTO': product === null || product === void 0 ? void 0 : product._id,
                                },
                            }, {
                                new: true,
                            })];
                    case 16:
                        _e.sent();
                        return [4 /*yield*/, category_1.default.findOneAndUpdate({
                                'childCategory._id': categoryId,
                            }, {
                                $push: {
                                    'childCategory.$.children.productsDTO': product === null || product === void 0 ? void 0 : product._id,
                                },
                            }, {
                                new: true,
                            })];
                    case 17:
                        _e.sent();
                        return [4 /*yield*/, category_1.default.findByIdAndUpdate({ _id: product === null || product === void 0 ? void 0 : product.categoryId }, {
                                $pull: { productsDTO: product === null || product === void 0 ? void 0 : product._id },
                            }, { new: true })];
                    case 18:
                        _e.sent();
                        return [3 /*break*/, 20];
                    case 19:
                        error_5 = _e.sent();
                        console.log(error_5);
                        return [3 /*break*/, 20];
                    case 20: return [2 /*return*/, { message: "Update ".concat(this.nameService, " success") }];
                    case 21:
                        error_6 = _e.sent();
                        console.log(error_6);
                        throw new Error("Occur error when delete ".concat(this.nameService, " with ").concat(error_6));
                    case 22: return [2 /*return*/];
                }
            });
        });
    };
    // GET BY ID
    ProductService.prototype.getByIdOverridingHavePopulate = function (id, populateName) {
        return __awaiter(this, void 0, void 0, function () {
            var category, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        category = void 0;
                        if (!populateName) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.model
                                .findById(id)
                                .populate({ path: populateName, select: 'variants' })];
                    case 1:
                        category = _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/, category];
                    case 3:
                        error_7 = _a.sent();
                        //   console.log(error);
                        throw new Error("Occur error when find by id ".concat(this.nameService, " with ").concat(error_7));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return ProductService;
}(crudService_1.default));
exports.default = ProductService;
