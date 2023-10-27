import authController from '@app/controllers/auth';
import { verifyToken } from '@app/middlewares/verifyToken';
import { Router } from 'express';

const router = Router();

// SIGNUP CUSTOMER
router.post('/signup', authController.signup);

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
