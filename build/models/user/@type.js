"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
// SCHEMAS DESCRIPTION
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - phoneNumber
 *         - password
 *         - email
 *       properties:
 *         birthday:
 *           type: string
 *           description: VD 2023-09-09
 *         fullName:
 *             type: string
 *         image:
 *           type: string
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
var Role;
(function (Role) {
    Role["ADMIN"] = "ADMIN";
    Role["USER"] = "USER";
})(Role || (exports.Role = Role = {}));
