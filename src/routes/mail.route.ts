import mailController from '@app/controllers/mail.controller';
import { Router } from 'express';

const routes = Router();

routes.post('/send-mail', mailController.sendMail);

export default routes;
