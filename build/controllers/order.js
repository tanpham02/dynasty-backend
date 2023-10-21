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
var order_1 = __importDefault(require("@app/models/order"));
var order_2 = __importDefault(require("@app/services/order"));
var orderService = new order_2.default(order_1.default, 'order');
var orderController = {
    // SEARCH PAGINATION
    searchPagination: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, pageIndex, pageSize, customerId, params, order, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.query, pageIndex = _a.pageIndex, pageSize = _a.pageSize, customerId = _a.customerId;
                    params = {
                        pageIndex: pageIndex ? parseInt(pageIndex.toString()) : 0,
                        pageSize: pageSize ? parseInt(pageSize.toString()) : 10,
                        customerId: customerId === null || customerId === void 0 ? void 0 : customerId.toString(),
                    };
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, orderService.getPaginationOverriding(params)];
                case 2:
                    order = _b.sent();
                    res.status(200).json(order);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _b.sent();
                    console.log(error_1);
                    res.status(500).json(error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); },
    // QUICK BUY
    quickBuy: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var orderWhenQuickBuy, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, orderService.quickBuy(req)];
                case 1:
                    orderWhenQuickBuy = _a.sent();
                    res.status(200).json(orderWhenQuickBuy);
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    res.status(500).json(error_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); },
    // GET ORDER BY ID
    getById: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var id, cart, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.params.id;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, orderService.getOrderById(id)];
                case 2:
                    cart = _a.sent();
                    if (!cart) {
                        return [2 /*return*/, res.status(404).json('Not found order with this id')];
                    }
                    return [2 /*return*/, res.status(200).json(cart)];
                case 3:
                    error_3 = _a.sent();
                    console.log('error', error_3);
                    res.status(500).json(error_3);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); },
    // CHECKOUT
    checkout: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var newOrder, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, orderService.checkout(req)];
                case 1:
                    newOrder = _a.sent();
                    res.status(200).json(newOrder);
                    return [3 /*break*/, 3];
                case 2:
                    error_4 = _a.sent();
                    res.status(500).json(error_4);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); },
    // UPDATE TOTAL ORDER WHEN USE VOUCHER 
    updateTotalOrderWhenUseVoucher: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, voucherId, customerId, orderId, updateTotalOrderWhenUseVoucher, error_5;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    _a = req.query, voucherId = _a.voucherId, customerId = _a.customerId, orderId = _a.orderId;
                    return [4 /*yield*/, orderService.updateTotalOrderWhenUseVoucher((voucherId === null || voucherId === void 0 ? void 0 : voucherId.toString()) || '', (customerId === null || customerId === void 0 ? void 0 : customerId.toString()) || '', (orderId === null || orderId === void 0 ? void 0 : orderId.toString()) || '')];
                case 1:
                    updateTotalOrderWhenUseVoucher = _b.sent();
                    res.status(200).json(updateTotalOrderWhenUseVoucher);
                    return [3 /*break*/, 3];
                case 2:
                    error_5 = _b.sent();
                    res.status(500).json(error_5);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); },
    // RE-ORDER
    reorder: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var orderId, customerId, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    orderId = req.params.orderId;
                    customerId = req.query.customerId;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, orderService.reorder(orderId, customerId ? customerId.toString() : '', req)];
                case 2:
                    _a.sent();
                    res.status(200).json('Add product in reorder to cart success');
                    return [3 /*break*/, 4];
                case 3:
                    error_6 = _a.sent();
                    res.status(500).json(error_6);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); },
    // UPDATE STATUS ORDER
    updateStatusOrder: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, orderId, statusOrderRequest, _b, message, statusCode, error_7;
        var _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _a = req.query, orderId = _a.orderId, statusOrderRequest = _a.statusOrderRequest;
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, orderService.updateStatusOrder(statusOrderRequest, (_c = orderId === null || orderId === void 0 ? void 0 : orderId.toString()) !== null && _c !== void 0 ? _c : '')];
                case 2:
                    _b = _d.sent(), message = _b.message, statusCode = _b.statusCode;
                    res.status(statusCode).json(message);
                    return [3 /*break*/, 4];
                case 3:
                    error_7 = _d.sent();
                    res.status(500).json(error_7);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); },
    // CANCEL ORDER
    requestCancelOrder: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, orderId, reason, message, error_8;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.query, orderId = _a.orderId, reason = _a.reason;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, orderService.cancelOrder((orderId === null || orderId === void 0 ? void 0 : orderId.toString()) || '', (reason === null || reason === void 0 ? void 0 : reason.toString()) || '')];
                case 2:
                    message = (_b.sent()).message;
                    res.status(200).json(message);
                    return [3 /*break*/, 4];
                case 3:
                    error_8 = _b.sent();
                    res.status(500).json(error_8);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); },
};
exports.default = orderController;
