"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImageProduct = void 0;
var multer_1 = __importDefault(require("multer"));
var uploadImageProduct = function () {
    var storage = multer_1.default.diskStorage({
        destination: '/upload/img/products',
        filename: function (req, file, cb) {
            return cb(null, file.originalname);
        },
    });
    return storage;
};
exports.uploadImageProduct = uploadImageProduct;
