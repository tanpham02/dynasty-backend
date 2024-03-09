import mailController from '@app/controllers/mail';
import { Router } from 'express';

const routes = Router();

/**
 * @swagger
 * '/api/mail/send-mail':
 *  post:
 *     tags: [MAILER]
 *     summary: Send mail
 *     responses:
 *       200:
 *         description: OK
 */
routes.post('/send-mail', mailController.sendMail);

export default routes;
