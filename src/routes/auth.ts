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
 *     summary: Signup
 *     requestBody:
 *       required: true
 *       content:
 *          multipart/form-data:
 *             schema:
 *                type: object
 *                properties:
 *                   customerSignupInfo:
 *                        $ref: '#/components/schema/Customer'
 *     responses:
 *       200:
 *         description: Ok
 */

// SIGNUP CUSTOMER
router.post('/customer/signup', formDataParser(FIELDS_NAME.CUSTOMER_SIGNUP), authController.signup);

// LOGIN FOR USER
router.post('/user/login', authController.loginUser);

// LOGIN FOR CUSTOMER
router.post('/customer/login', authController.loginCustomer);

// REQUEST REFRESH TOKEN FOR USER
router.post('/user/refresh-token', authController.requestRefreshTokenForUser);

// REQUEST REFRESH TOKEN FOR CUSTOMER
router.post('/customer/refresh-token', authController.requestRefreshTokenForCustomer);

// LOGOUT
router.post('/logout', verifyToken, authController.logout);

export default router;
