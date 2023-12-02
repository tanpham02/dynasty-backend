"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SALT = exports.ProductStatus = exports.MODE = void 0;
var MODE;
(function (MODE) {
    MODE["DEVELOPMENT"] = "development";
    MODE["PRODUCTION"] = "production";
})(MODE || (exports.MODE = MODE = {}));
var ProductStatus;
(function (ProductStatus) {
    ProductStatus["ACTIVE"] = "ACTIVE";
    ProductStatus["IN_ACTIVE"] = "IN_ACTIVE";
    ProductStatus["IN_COMING"] = "IN_COMING";
})(ProductStatus || (exports.ProductStatus = ProductStatus = {}));
var SALT = 10;
exports.SALT = SALT;
