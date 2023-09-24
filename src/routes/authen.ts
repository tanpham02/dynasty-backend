import authenController from '@app/controllers/authen';
import { verifyToken } from '@app/middlewares/verifyToken';
import { Router } from 'express';

const router = Router();

// LOGIN
router.post('/login', authenController.login);

// REQUEST REFRESH TOKEN
router.post('/refresh', authenController.requestRefreshToken);

// REQUEST REFRESH TOKEN
router.post('/logout', verifyToken, authenController.logout);

export default router;
