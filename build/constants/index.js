"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SALT = exports.Status = exports.MODE = void 0;
var MODE;
(function (MODE) {
    MODE["DEVELOPMENT"] = "development";
    MODE["PRODUCTION"] = "production";
})(MODE || (exports.MODE = MODE = {}));
var Status;
(function (Status) {
    Status["ACTIVE"] = "ACTIVE";
    Status["IN_ACTIVE"] = "IN_ACTIVE";
    Status["DELETED"] = "DELETED";
    Status["IN_COMING"] = "IN_COMING";
})(Status || (exports.Status = Status = {}));
var SALT = 10;
exports.SALT = SALT;
