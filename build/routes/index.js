"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routesMapping = void 0;
var category_1 = __importDefault(require("./category"));
var product_1 = __importDefault(require("./product"));
var shopSystem_1 = __importDefault(require("./shopSystem"));
var comboPromotions_1 = __importDefault(require("./comboPromotions"));
var promotions_1 = __importDefault(require("./promotions"));
var configStore_1 = __importDefault(require("./configStore"));
var voucher_1 = __importDefault(require("./voucher"));
var user_1 = __importDefault(require("./user"));
var customerAddress_1 = __importDefault(require("./customerAddress"));
var customer_1 = __importDefault(require("./customer"));
var cart_1 = __importDefault(require("./cart"));
var auth_1 = __importDefault(require("./auth"));
var order_1 = __importDefault(require("./order"));
var material_1 = __importDefault(require("./material"));
var apiUrl_1 = require("@app/services/apiUrl");
var routesMapping = function (app) {
    var routesData = [
        {
            path: apiUrl_1.CATEGORY_URL,
            route: category_1.default,
        },
        {
            path: apiUrl_1.PRODUCT_URL,
            route: product_1.default,
        },
        {
            path: apiUrl_1.SHOP_SYSTEM_URL,
            route: shopSystem_1.default,
        },
        {
            path: apiUrl_1.COMBO_PROMOTIONS_URL,
            route: comboPromotions_1.default,
        },
        {
            path: apiUrl_1.CONFIG_STORE_URL,
            route: configStore_1.default,
        },
        {
            path: apiUrl_1.PROMOTIONS_URL,
            route: promotions_1.default,
        },
        {
            path: apiUrl_1.USER_URL,
            route: user_1.default,
        },
        {
            path: apiUrl_1.VOUCHER_URL,
            route: voucher_1.default,
        },
        {
            path: apiUrl_1.CUSTOMER_URL,
            route: customer_1.default,
        },
        {
            path: apiUrl_1.CUSTOMER_URL,
            route: customerAddress_1.default,
        },
        {
            path: apiUrl_1.CART_URL,
            route: cart_1.default,
        },
        {
            path: apiUrl_1.AUTH_URL,
            route: auth_1.default,
        },
        {
            path: apiUrl_1.ORDER_URL,
            route: order_1.default,
        },
        {
            path: apiUrl_1.MATERIAL_URL,
            route: material_1.default,
        },
    ];
    routesData.forEach(function (_a) {
        var path = _a.path, route = _a.route;
        return app.use("".concat(path), route);
    });
};
exports.routesMapping = routesMapping;
