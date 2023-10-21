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
var crudService_1 = __importDefault(require("./crudService"));
var _type_1 = require("@app/models/cart/@type");
var CartService = /** @class */ (function (_super) {
    __extends(CartService, _super);
    function CartService(model, nameService) {
        return _super.call(this, model, nameService) || this;
    }
    CartService.prototype.updateCart = function (customerId, req) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var messageRes, cartAfterFindByCustomerId, productItemFromBody, productItemFromDatabase, _c, error_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        messageRes = { message: '' };
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 11, , 12]);
                        if (!customerId) return [3 /*break*/, 10];
                        return [4 /*yield*/, this.model.findOne({ customerId: customerId })];
                    case 2:
                        cartAfterFindByCustomerId = _d.sent();
                        productItemFromBody = (_b = (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.products) === null || _b === void 0 ? void 0 : _b[0];
                        return [4 /*yield*/, this.model.findOne({
                                customerId: customerId,
                                'products.productId': productItemFromBody === null || productItemFromBody === void 0 ? void 0 : productItemFromBody.productId,
                            })];
                    case 3:
                        productItemFromDatabase = _d.sent();
                        if (!(productItemFromDatabase &&
                            new Object(productItemFromDatabase.customerId).valueOf() === customerId &&
                            productItemFromBody.actionType === _type_1.ActionType.UPDATE)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.model.updateOne({
                                'products.productId': productItemFromBody === null || productItemFromBody === void 0 ? void 0 : productItemFromBody.productId,
                            }, {
                                $set: {
                                    'products.$.quantityProducts': productItemFromBody === null || productItemFromBody === void 0 ? void 0 : productItemFromBody.quantityProducts,
                                },
                            }, { new: true })];
                    case 4:
                        _d.sent();
                        messageRes = {
                            message: 'Update cart item successfully',
                        };
                        _d.label = 5;
                    case 5:
                        if (!(productItemFromBody.actionType === _type_1.ActionType.ADD)) return [3 /*break*/, 8];
                        _c = (cartAfterFindByCustomerId === null || cartAfterFindByCustomerId === void 0 ? void 0 : cartAfterFindByCustomerId.products);
                        if (!_c) return [3 /*break*/, 7];
                        return [4 /*yield*/, (cartAfterFindByCustomerId === null || cartAfterFindByCustomerId === void 0 ? void 0 : cartAfterFindByCustomerId.updateOne({
                                $set: {
                                    products: __spreadArray(__spreadArray([], cartAfterFindByCustomerId === null || cartAfterFindByCustomerId === void 0 ? void 0 : cartAfterFindByCustomerId.products, true), [
                                        __assign(__assign({}, productItemFromBody), { quantityProducts: (productItemFromBody === null || productItemFromBody === void 0 ? void 0 : productItemFromBody.quantityProducts) || 1 }),
                                    ], false),
                                },
                            }, { new: true }))];
                    case 6:
                        _c = (_d.sent());
                        _d.label = 7;
                    case 7:
                        _c;
                        messageRes = {
                            message: 'Add cart item successfully',
                        };
                        _d.label = 8;
                    case 8:
                        if (!(productItemFromDatabase &&
                            new Object(productItemFromDatabase.customerId).valueOf() === customerId &&
                            productItemFromBody.actionType === _type_1.ActionType.DELETE)) return [3 /*break*/, 10];
                        return [4 /*yield*/, productItemFromDatabase.updateOne({
                                $pull: {
                                    products: { productId: productItemFromBody === null || productItemFromBody === void 0 ? void 0 : productItemFromBody.productId },
                                },
                            }, { new: true })];
                    case 9:
                        _d.sent();
                        messageRes = { message: 'Delete cart item successfully' };
                        _d.label = 10;
                    case 10: return [2 /*return*/, messageRes];
                    case 11:
                        error_1 = _d.sent();
                        console.log('error', error_1);
                        throw new Error("Occur error when add to cart");
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    CartService.prototype.getCartByCustomerId = function (customerId) {
        return __awaiter(this, void 0, void 0, function () {
            var total, cart, totalCart, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        total = 0;
                        return [4 /*yield*/, this.model
                                .findOne({ customerId: customerId })
                                .populate('products.productId')];
                    case 1:
                        cart = _a.sent();
                        if (cart === null || cart === void 0 ? void 0 : cart.products) {
                            totalCart = cart === null || cart === void 0 ? void 0 : cart.products.reduce(function (prev, next) {
                                var productItem = next === null || next === void 0 ? void 0 : next.productId;
                                return prev + productItem.price * next.quantityProducts;
                            }, 0);
                            return [2 /*return*/, __assign(__assign({}, JSON.parse(JSON.stringify(__assign({}, cart)))._doc), { totalCart: totalCart })];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        console.log('error', error_2);
                        throw new Error("Occur error when get cart");
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return CartService;
}(crudService_1.default));
exports.default = CartService;
