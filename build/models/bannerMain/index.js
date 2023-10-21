"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var BannerMainSchema = new mongoose_1.Schema({
    name: {
        type: String,
    },
    banner: {
        type: String,
    },
    redirect: {
        type: String,
    },
}, { timestamps: true, versionKey: false });
var BannerMainModel = (0, mongoose_1.model)('BannerMain', BannerMainSchema);
exports.default = BannerMainModel;
