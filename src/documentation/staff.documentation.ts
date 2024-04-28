/**
 * @swagger
 * components:
 *   schemas:
 *     Staff:
 *       type: object
 *       required:
 *         - username
 *         - phoneNumber
 *         - password
 *         - email
 *       properties:
 *         birthday:
 *           type: string
 *           description: VD 2023-09-09
 *         username:
 *             type: string
 *         fullName:
 *             type: string
 *         image:
 *           type: string
 *         phoneNumber:
 *           type: string
 *         email:
 *           type: string
 *         location:
 *           type: string
 *         city:
 *           type: string
 *         cityId:
 *           type: string
 *         district:
 *           type: string
 *         districtId:
 *           type: string
 *         ward:
 *           type: string
 *         wardId:
 *           type: string
 *         password:
 *           type: string
 *         role:
 *           type: string
 *           enum: [ADMIN, USER]
 *         status:
 *           type: string
 *           enum: [ACTIVE, INACTIVE]
 */
