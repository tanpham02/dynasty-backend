import { FIELDS_NAME } from '@app/constants';
import authController from '@app/controllers/auth';
import { formDataParser } from '@app/middlewares/formDataParser';
import { verifyToken } from '@app/middlewares/verifyToken';
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
 *          multipart/form-data:
 *             schema:
 *                type: object
 *                properties:
 *                   customerSignupInfo:
 *                        $ref: '#/components/schema/Customers'
 *     responses:
 *       200:
 *         description: Ok
 */

// SIGNUP CUSTOMER
router.post('/customer/signup', formDataParser(FIELDS_NAME.CUSTOMER_SIGNUP), authController.signup);

/**
 * @swagger
 * '/api/auth/user/login':
 *  post:
 *     tags: [Authentication]
 *     summary: User Login
 *     requestBody:
 *       required: true
 *       content:
 *          multipart/form-data:
 *             schema:
 *                type: object
 *                properties:
 *                   userLoginInfo:
 *                        type: object
 *                        properties:
 *                            username:
 *                                type: string
 *                            password:
 *                                type: string
 *     responses:
 *       200:
 *         description: Ok
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schema/Users'
 */
// LOGIN FOR USER
router.post('/user/login', formDataParser(FIELDS_NAME.USER_LOGIN), authController.loginUser);

/**
 * @swagger
 * '/api/auth/customer/login':
 *  post:
 *     tags: [Authentication]
 *     summary: Customer Login
 *     requestBody:
 *       required: true
 *       content:
 *          multipart/form-data:
 *             schema:
 *                type: object
 *                properties:
 *                   customerLoginInfo:
 *                        type: object
 *                        properties:
 *                            phoneNumber:
 *                                type: string
 *                            password:
 *                                type: string
 *     responses:
 *       200:
 *         description: Ok
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schema/Customers'
 */
// LOGIN FOR CUSTOMER
router.post(
  '/customer/login',
  formDataParser(FIELDS_NAME.CUSTOMER_LOGIN),
  authController.loginCustomer,
);

// CUSTOMER LOGIN APP WITH PHONE NUMBER (OTP)
router.post(
  '/customer/phone-number',
  formDataParser(FIELDS_NAME.CUSTOMER_LOGIN),
  authController.customerLoginWithPhoneNumber,
);

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
 *                $ref: '#/components/schema/Customers'
 */

// LOGIN WITH GOOGLE ACCOUNT
router.post('/customer/login/social-account/google', authController.loginWithGoogleAccount);

// REQUEST REFRESH TOKEN FOR USER
router.post('/user/refresh-token', authController.requestRefreshTokenForUser);

// REQUEST REFRESH TOKEN FOR CUSTOMER
router.post('/customer/refresh-token', authController.requestRefreshTokenForCustomer);

// LOGOUT
router.post('/logout', verifyToken, authController.logout);

export default router;
