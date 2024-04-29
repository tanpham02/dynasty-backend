import { Router } from 'express';

import { mailerController } from '@app/controllers';

const routes = Router();

/**
 * @swagger
 * '/api/mailer/send-mail':
 *  post:
 *     tags: [Mailer]
 *     summary: Send mail
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Mailer'
 *     responses:
 *       200:
 *         description: OK
 */

// SEND MAIL
routes.post('/send-mail', mailerController.sendMail);

export default routes;
