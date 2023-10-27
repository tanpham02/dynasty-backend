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
var voucher_1 = __importDefault(require("@app/models/voucher"));
var cart_1 = __importDefault(require("@app/models/cart"));
var cart_2 = __importDefault(require("./cart"));
var voucher_2 = __importDefault(require("./voucher"));
var customer_1 = __importDefault(require("./customer"));
var customer_2 = __importDefault(require("@app/models/customer"));
var product_1 = __importDefault(require("@app/models/product"));
var configStore_1 = __importDefault(require("./configStore"));
var configStore_2 = __importDefault(require("@app/models/configStore"));
var customerService = new customer_1.default(customer_2.default, 'customer');
var cartService = new cart_2.default(cart_1.default, 'cart');
var voucherService = new voucher_2.default(voucher_1.default, 'voucher');
var configStoreService = new configStore_1.default(configStore_2.default, 'config store');
var OrderService = /** @class */ (function (_super) {
    __extends(OrderService, _super);
    function OrderService(model, nameService) {
        return _super.call(this, model, nameService) || this;
    }
    // SEARCH PAGINATION
    OrderService.prototype.getPaginationOverriding = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var pageIndex, pageSize, customerId, from, to, statusOrder, filter, data, totalElement, totalPages, isLastPage, result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        pageIndex = params.pageIndex, pageSize = params.pageSize, customerId = params.customerId, from = params.from, to = params.to, statusOrder = params.statusOrder;
                        filter = {};
                        if (customerId) {
                            filter.customerId = customerId;
                        }
                        if (from && to) {
                            filter.createdAt = { $gte: from, $lte: to };
                        }
                        if (statusOrder) {
                            filter.statusOrder = statusOrder;
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
                            data: data.sort(function (a, b) { var _a, _b; return new Date((_a = b === null || b === void 0 ? void 0 : b.createdAt) !== null && _a !== void 0 ? _a : '').getTime() - new Date((_b = a === null || a === void 0 ? void 0 : a.createdAt) !== null && _b !== void 0 ? _b : '').getTime(); }),
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
    // CHECKOUT
    OrderService.prototype.checkout = function (req) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var customerId, newData, productCartQuery, feeShip, customerId_1, remainingProductCartQuery, shipFee, newOrder, customer, error_2;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        customerId = (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.customerId;
                        newData = __assign({}, req.body);
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 9, , 10]);
                        if (!customerId) return [3 /*break*/, 4];
                        return [4 /*yield*/, cartService.getCartByCustomerId(customerId)];
                    case 2:
                        productCartQuery = _c.sent();
                        return [4 /*yield*/, configStoreService.findAll()];
                    case 3:
                        feeShip = _c.sent();
                        if (productCartQuery) {
                            customerId_1 = productCartQuery.customerId, remainingProductCartQuery = __rest(productCartQuery, ["customerId"]);
                            shipFee = ((_b = feeShip === null || feeShip === void 0 ? void 0 : feeShip[0]) === null || _b === void 0 ? void 0 : _b.feeShip) || 0;
                            newData = __assign(__assign({}, newData), { productFromCart: __assign({}, remainingProductCartQuery), totalOrderAmountBeforeUseDiscount: remainingProductCartQuery.totalCart, totalOrder: remainingProductCartQuery.totalCart + shipFee, shipFee: shipFee });
                        }
                        _c.label = 4;
                    case 4:
                        newOrder = new this.model(newData);
                        return [4 /*yield*/, customerService.getById(customerId)];
                    case 5:
                        customer = _c.sent();
                        if (!customer) return [3 /*break*/, 7];
                        return [4 /*yield*/, (customer === null || customer === void 0 ? void 0 : customer.updateOne({ $push: { orderIds: newOrder._id } }))];
                    case 6:
                        _c.sent();
                        _c.label = 7;
                    case 7: return [4 /*yield*/, newOrder.save()];
                    case 8:
                        _c.sent();
                        return [2 /*return*/, newOrder];
                    case 9:
                        error_2 = _c.sent();
                        throw new Error("Occur error when checkout ".concat(this.nameService));
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    // QUICK BUY
    OrderService.prototype.quickBuy = function (req) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function () {
            var productIdFromCart, product, feeShip, newData, quickBuyOrder, error_3;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _e.trys.push([0, 4, , 5]);
                        productIdFromCart = (_b = (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.productFromCart) === null || _b === void 0 ? void 0 : _b.products;
                        return [4 /*yield*/, product_1.default.findById((_c = productIdFromCart === null || productIdFromCart === void 0 ? void 0 : productIdFromCart[0]) === null || _c === void 0 ? void 0 : _c.productId)];
                    case 1:
                        product = _e.sent();
                        return [4 /*yield*/, configStoreService.findAll()];
                    case 2:
                        feeShip = _e.sent();
                        newData = __assign(__assign({}, req.body), { productFromCart: {
                                products: __spreadArray([], productIdFromCart, true),
                                totalCart: product === null || product === void 0 ? void 0 : product.price,
                            }, shipFee: feeShip, totalOrderAmountBeforeUseDiscount: product === null || product === void 0 ? void 0 : product.price, totalOrder: ((product === null || product === void 0 ? void 0 : product.price) || 0) + (((_d = feeShip === null || feeShip === void 0 ? void 0 : feeShip[0]) === null || _d === void 0 ? void 0 : _d.feeShip) || 0) });
                        quickBuyOrder = new this.model(newData);
                        return [4 /*yield*/, quickBuyOrder.save()];
                    case 3:
                        _e.sent();
                        return [2 /*return*/, { orderId: quickBuyOrder._id }];
                    case 4:
                        error_3 = _e.sent();
                        console.log('🚀 error:', error_3);
                        throw new Error("Occur ".concat(error_3, " when handle quick buy"));
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    // UPDATE TOTAL ORDER WHEN USE VOUCHER
    OrderService.prototype.updateTotalOrderWhenUseVoucher = function (voucherId, customerId, orderId) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var voucher, order, error_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 7, , 8]);
                        if (!voucherId) return [3 /*break*/, 6];
                        return [4 /*yield*/, voucher_1.default.findById(voucherId)];
                    case 1:
                        voucher = _b.sent();
                        if (!!((_a = voucher === null || voucher === void 0 ? void 0 : voucher.customerIdsUsedVoucher) === null || _a === void 0 ? void 0 : _a.includes(customerId))) return [3 /*break*/, 3];
                        return [4 /*yield*/, (voucher === null || voucher === void 0 ? void 0 : voucher.updateOne({
                                $push: { customerIdsUsedVoucher: customerId },
                            }))];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3: return [4 /*yield*/, this.model.findOne({ _id: orderId })];
                    case 4:
                        order = _b.sent();
                        if (!(order && (order === null || order === void 0 ? void 0 : order.totalOrder) && voucher && (voucher === null || voucher === void 0 ? void 0 : voucher.discount))) return [3 /*break*/, 6];
                        return [4 /*yield*/, (order === null || order === void 0 ? void 0 : order.updateOne({ $set: { totalOrder: order.totalOrder - (voucher === null || voucher === void 0 ? void 0 : voucher.discount), voucherId: voucherId } }, { new: true }))];
                    case 5:
                        _b.sent();
                        _b.label = 6;
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        error_4 = _b.sent();
                        throw new Error('Occur error when update total order when use voucher');
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    // RE-ORDER
    OrderService.prototype.reorder = function (orderId, customerId, req) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var ordered, cartAfterFindByCustomerId_1, productOrdered, productInCarted, productOrderedQueryProducts_1, addCartWhenNoExist, _loop_1, index, error_5;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 9, , 10]);
                        if (!orderId) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.model
                                .findById(orderId)
                                .then(function (res) { return res === null || res === void 0 ? void 0 : res.populate('productFromCart.products.productId'); })];
                    case 1:
                        ordered = _b.sent();
                        return [4 /*yield*/, cart_1.default.findOne({ customerId: customerId })];
                    case 2:
                        cartAfterFindByCustomerId_1 = _b.sent();
                        if (!ordered) return [3 /*break*/, 8];
                        productOrdered = (ordered === null || ordered === void 0 ? void 0 : ordered.productFromCart) || [];
                        productInCarted = (cartAfterFindByCustomerId_1 === null || cartAfterFindByCustomerId_1 === void 0 ? void 0 : cartAfterFindByCustomerId_1.products) || [];
                        productOrderedQueryProducts_1 = productOrdered === null || productOrdered === void 0 ? void 0 : productOrdered.products;
                        addCartWhenNoExist = function (productIdNotExistInCart) { return __awaiter(_this, void 0, void 0, function () {
                            var quantityProdNotExistCart;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!productIdNotExistInCart) return [3 /*break*/, 2];
                                        quantityProdNotExistCart = productOrderedQueryProducts_1 === null || productOrderedQueryProducts_1 === void 0 ? void 0 : productOrderedQueryProducts_1.find(function (item) { return new Object(item.productId._id).valueOf() === productIdNotExistInCart; });
                                        return [4 /*yield*/, (cartAfterFindByCustomerId_1 === null || cartAfterFindByCustomerId_1 === void 0 ? void 0 : cartAfterFindByCustomerId_1.updateOne({
                                                $push: {
                                                    products: quantityProdNotExistCart,
                                                },
                                            }, { new: true }))];
                                    case 1: return [2 /*return*/, _a.sent()];
                                    case 2: return [4 /*yield*/, (cartAfterFindByCustomerId_1 === null || cartAfterFindByCustomerId_1 === void 0 ? void 0 : cartAfterFindByCustomerId_1.updateOne({
                                            $set: {
                                                products: productOrderedQueryProducts_1,
                                            },
                                        }, { new: true }))];
                                    case 3:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); };
                        if (!(productInCarted.length > 0)) return [3 /*break*/, 7];
                        _loop_1 = function (index) {
                            var elementProductOrdered, convertElementProductOrdered_Id, elementProductOrderedId, quantityProdInCart;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0:
                                        elementProductOrdered = productOrderedQueryProducts_1 === null || productOrderedQueryProducts_1 === void 0 ? void 0 : productOrderedQueryProducts_1[index];
                                        convertElementProductOrdered_Id = elementProductOrdered === null || elementProductOrdered === void 0 ? void 0 : elementProductOrdered.productId;
                                        elementProductOrderedId = JSON.parse(JSON.stringify(convertElementProductOrdered_Id._id));
                                        return [4 /*yield*/, ((_a = cartAfterFindByCustomerId_1 === null || cartAfterFindByCustomerId_1 === void 0 ? void 0 : cartAfterFindByCustomerId_1.products) === null || _a === void 0 ? void 0 : _a.find(function (item) { return new Object(item.productId).valueOf() === elementProductOrderedId; }))];
                                    case 1:
                                        quantityProdInCart = _c.sent();
                                        if (quantityProdInCart) {
                                            (function () {
                                                return __awaiter(this, void 0, void 0, function () {
                                                    return __generator(this, function (_a) {
                                                        switch (_a.label) {
                                                            case 0: return [4 /*yield*/, (cart_1.default === null || cart_1.default === void 0 ? void 0 : cart_1.default.updateOne({
                                                                    'products.productId': elementProductOrderedId,
                                                                }, {
                                                                    $set: {
                                                                        'products.$.quantityProducts': elementProductOrdered.quantityProducts +
                                                                            quantityProdInCart.quantityProducts,
                                                                    },
                                                                }, { new: true }))];
                                                            case 1: return [2 /*return*/, _a.sent()];
                                                        }
                                                    });
                                                });
                                            })();
                                        }
                                        if (!quantityProdInCart) {
                                            addCartWhenNoExist(elementProductOrderedId);
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        };
                        index = 0;
                        _b.label = 3;
                    case 3:
                        if (!(index < (productOrderedQueryProducts_1 === null || productOrderedQueryProducts_1 === void 0 ? void 0 : productOrderedQueryProducts_1.length))) return [3 /*break*/, 6];
                        return [5 /*yield**/, _loop_1(index)];
                    case 4:
                        _b.sent();
                        _b.label = 5;
                    case 5:
                        index++;
                        return [3 /*break*/, 3];
                    case 6: return [2 /*return*/];
                    case 7:
                        addCartWhenNoExist();
                        _b.label = 8;
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        error_5 = _b.sent();
                        console.log('🚀error:', error_5);
                        throw new Error("Occur ".concat(error_5, " when handle quick buy"));
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    // UPDATE STATUS ORDER
    OrderService.prototype.updateStatusOrder = function (status, orderId) {
        return __awaiter(this, void 0, void 0, function () {
            var error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        if (!orderId) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.model.findOneAndUpdate({ _id: orderId }, { $set: { statusOrder: status } })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, {
                                message: 'Update status order success',
                                statusCode: 200,
                            }];
                    case 2: return [2 /*return*/, {
                            message: "Not found order with this ".concat(orderId),
                            statusCode: 404,
                        }];
                    case 3:
                        error_6 = _a.sent();
                        throw new Error("Occur error when change status ".concat(this.nameService));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // GET ORDER BY ID
    OrderService.prototype.getOrderById = function (orderId) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var order, error_7;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, ((_a = this.model
                                .findById(orderId)) === null || _a === void 0 ? void 0 : _a.populate('productFromCart.products.productId'))];
                    case 1:
                        order = _b.sent();
                        return [2 /*return*/, order];
                    case 2:
                        error_7 = _b.sent();
                        throw new Error('Occur error when retries order');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // CANCEL ORDER
    OrderService.prototype.cancelOrder = function (orderId, reason) {
        return __awaiter(this, void 0, void 0, function () {
            var error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.model.findOneAndUpdate({
                                _id: orderId,
                            }, {
                                $set: { reasonCancelOrder: reason, statusOrder: 'CANCELED' },
                            }, { new: true })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, { message: 'In process' }];
                    case 2:
                        error_8 = _a.sent();
                        throw new Error('Occur error when send request cancel order');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return OrderService;
}(crudService_1.default));
exports.default = OrderService;
