"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var _type_1 = require("./@type");
var constants_1 = require("@app/constants");
// SCHEMAS RESPONSE
/**
 * @swagger
 * components:
 *   schema:
 *     User:
 *       type: object
 *       required:
 *         - phoneNumber
 *         - password
 *         - username
 *         - email
 *       properties:
 *         username:
 *           type: string
 *         birthday:
 *           type: string
 *         fullName:
 *             type: string
 *         phoneNumber:
 *           type: string
 *         email:
 *           type: string
 *         address:
 *           type: string
 *         password:
 *           type: string
 *         role:
 *           type: string
 *           enum: [ADMIN, USER]
 *         status:
 *           type: string
 *           enum: [ACTIVE, IN_ACTIVE]
 */
var UserSchema = new mongoose_1.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    birthday: {
        type: Date,
    },
    fullName: {
        type: String,
    },
    phoneNumber: {
        type: String,
        unique: true,
        required: true,
    },
    image: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    address: {
        type: String,
    },
    city: {
        type: String,
    },
    cityId: {
        type: Number,
    },
    district: {
        type: String,
    },
    districtId: {
        type: Number,
    },
    ward: {
        type: String,
    },
    wardId: {
        type: Number,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    role: {
        type: String,
        enum: _type_1.Role,
        default: _type_1.Role.USER,
    },
    status: {
        type: String,
        enum: constants_1.Status,
        default: constants_1.Status.ACTIVE,
    },
}, { timestamps: true, versionKey: false });
var UserModel = (0, mongoose_1.model)('User', UserSchema);
exports.default = UserModel;
