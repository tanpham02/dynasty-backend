"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
require("module-alias/register");
var configs_1 = require("@app/configs");
var connection_1 = __importDefault(require("@app/connection"));
var routes_1 = require("@app/routes");
var apiUrl_1 = require("./services/apiUrl");
var app = (0, express_1.default)();
var _a = (0, configs_1.configApp)(), APP_URL = _a.APP_URL, port = _a.port;
// Connect DB
(0, connection_1.default)();
// Config Server
(0, configs_1.configServer)(app);
// Config Swagger
(0, configs_1.configSwagger)(app);
// Routes
// CATEGORY
app.use("".concat(apiUrl_1.AUTH_URL), routes_1.authRouter);
// CATEGORY
app.use("".concat(apiUrl_1.CATEGORY_URL), routes_1.categoryRouter);
// PRODUCT
app.use("".concat(apiUrl_1.PRODUCT_URL), routes_1.productRouter);
// PRODUCT VARIANT
app.use("".concat(apiUrl_1.PRODUCT_VARIANT_URL), routes_1.productVariantRouter);
//SHOP SYSTEM
app.use("".concat(apiUrl_1.SHOP_SYSTEM_URL), routes_1.shopSystemRouter);
// COMBO PROMOTIONS
app.use("".concat(apiUrl_1.COMBO_PROMOTIONS_URL), routes_1.comboPromotionsRouter);
// PROMOTIONS
app.use("".concat(apiUrl_1.PROMOTIONS_URL), routes_1.promotionsRouter);
// CONFIG STORE
app.use("".concat(apiUrl_1.CONFIG_STORE_URL), routes_1.configStoreRouter);
// VOUCHER
app.use("".concat(apiUrl_1.VOUCHER_URL), routes_1.voucherRouter);
// USER
app.use("".concat(apiUrl_1.USER_URL), routes_1.userRouter);
// CUSTOMER
app.use("".concat(apiUrl_1.CUSTOMER_URL), routes_1.customerAddressRouter);
app.use("".concat(apiUrl_1.CUSTOMER_URL), routes_1.customerRouter);
// CART
app.use("".concat(apiUrl_1.CART_URL), routes_1.cartRouter);
// ORDER
app.use("".concat(apiUrl_1.ORDER_URL), routes_1.orderRouter);
// MATERIAL
app.use("".concat(apiUrl_1.MATERIAL_URL), routes_1.materialRouter);
app.listen(port, function () {
    console.log("Server is running at ".concat(APP_URL));
});
