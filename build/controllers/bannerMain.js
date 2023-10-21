"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bannerMain_1 = __importDefault(require("@app/models/bannerMain"));
var bannerMain_2 = __importDefault(require("@app/services/bannerMain"));
var bannerMainService = new bannerMain_2.default(bannerMain_1.default, 'banner main');
