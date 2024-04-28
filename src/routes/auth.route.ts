import { FIELDS_NAME } from '@app/constants/app';
import authController from '@app/controllers/auth.controller';
import { formDataParser } from '@app/utils/form-data-parser.util';
import { verifyToken } from '@app/middlewares/verify-token';
import { Router } from 'express';

const router = Router();

/**
 * @swagger
 * '/api/auth/customer/signup':
 *  post:
 *     tags: [Authentication]
 *     summary: Customer Signup
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *             schema:
 *                $ref: '#/components/schemas/Customers'
 *     responses:
 *       200:
 *         description: Ok
 */

// SIGNUP CUSTOMER
router.post('/customer/signup', authController.signup);

/**
 * @swagger
 * '/api/auth/staff/login':
 *  post:
 *     tags: [Authentication]
 *     summary: User Login
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *             schema:
 *                type: object
 *                properties:
 *                    username:
 *                       type: string
 *                    password:
 *                       type: string
 *     responses:
 *       200:
 *         description: Ok
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Staff'
 */
// LOGIN FOR STAFF
router.post('/staff/login', authController.loginStaff);

/**
 * @swagger
 * '/api/auth/customer/login':
 *  post:
 *     tags: [Authentication]
 *     summary: Customer Login
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *             schema:
 *                type: object
 *                properties:
 *                   phoneNumber:
 *                       type: string
 *                   password:
 *                       type: string
 *     responses:
 *       200:
 *         description: Ok
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Customers'
 */
// LOGIN FOR CUSTOMER
router.post('/customer/login', authController.loginCustomer);

/**
 * @swagger
 * '/api/auth/customer/login/phone-number':
 *  post:
 *     tags: [Authentication]
 *     summary: CUSTOMER LOGIN APP WITH PHONE NUMBER
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *             schema:
 *                type: object
 *                properties:
 *                   phoneNumber:
 *                       type: string
 *     responses:
 *       200:
 *         description: Ok
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Customers'
 */
// CUSTOMER LOGIN APP WITH PHONE NUMBER (OTP)
router.post('/customer/login/phone-number', authController.sendOtpToCustomer);

/**
 * @swagger
 * '/api/auth/customer/login/phone-number/verify-otp':
 *  post:
 *     tags: [Authentication]
 *     summary: VERIFY OTP AND COMPLETE LOGIN WITH PHONE NUMBER
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *             schema:
 *                type: object
 *                properties:
 *                   phoneNumber:
 *                       type: string
 *                   otp:
 *                       type: string
 *     responses:
 *       200:
 *         description: Ok
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Customers'
 */
// VERIFY OTP AND COMPLETE LOGIN WITH PHONE NUMBER
router.post('/customer/login/phone-number/verify-otp', authController.verifyOtpAndGetCustomer);

/**
 * @swagger
 * '/api/auth/customer/login/social-account/google':
 *  post:
 *     tags: [Authentication]
 *     summary: Customer login google account
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *             schema:
 *                type: object
 *                properties:
 *                   accessToken:
 *                        type: string
 *
 *     responses:
 *       200:
 *         description: Ok
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Customers'
 */

// LOGIN WITH GOOGLE ACCOUNT
router.post('/customer/login/social-account/google', authController.loginWithGoogleAccount);

/**
 * @swagger
 * '/api/auth/staff/refresh-token':
 *  post:
 *     tags: [Authentication]
 *     summary: REQUEST REFRESH TOKEN FOR STAFF
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *             schema:
 *                type: object
 *                properties:
 *                   refreshToken:
 *                        type: string
 *     responses:
 *       200:
 *         description: Ok
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Staff'
 */
// REQUEST REFRESH TOKEN FOR STAFF
router.post('/staff/refresh-token', authController.requestRefreshTokenForStaff);

/**
 * @swagger
 * '/api/auth/customer/refresh-token':
 *  post:
 *     tags: [Authentication]
 *     summary: REQUEST REFRESH TOKEN FOR CUSTOMER
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *             schema:
 *                type: object
 *                properties:
 *                   refreshToken:
 *                        type: string
 *     responses:
 *       200:
 *         description: Ok
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Customers'
 */
// REQUEST REFRESH TOKEN FOR CUSTOMER
router.post('/customer/refresh-token', authController.requestRefreshTokenForCustomer);

// LOGOUT
router.post('/logout', verifyToken, authController.logout);

export default router;
