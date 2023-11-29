"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var auth_1 = __importDefault(require("@app/controllers/auth"));
var verifyToken_1 = require("@app/middlewares/verifyToken");
var express_1 = require("express");
var router = (0, express_1.Router)();
/**
 * //@swagger
 * '/api/auth/signup':
 *  post:
 *     tags: [Authentication]
 *     summary: Signup
 *     requestBody:
 *       required: true
 *       content:
 *          multipart/form-data:
 *             schema:
 *                type: object
 *                properties:
 *                   customerInfo:
 *                        $ref: '#/components/schema/Customer'
 *     responses:
 *       200:
 *         description: Ok
 */
// SIGNUP CUSTOMER
router.post('/signup', auth_1.default.signup);
// LOGIN FOR USER
router.post('/user/login', auth_1.default.loginUser);
// LOGIN FOR CUSTOMER
router.post('/customer/login', auth_1.default.loginCustomer);
// REQUEST REFRESH TOKEN FOR USER
router.post('/user/refresh-token', auth_1.default.requestRefreshTokenForUser);
// REQUEST REFRESH TOKEN FOR CUSTOMER
router.post('/customer/refresh-token', auth_1.default.requestRefreshTokenForCustomer);
// LOGOUT
router.post('/logout', verifyToken_1.verifyToken, auth_1.default.logout);
exports.default = router;
