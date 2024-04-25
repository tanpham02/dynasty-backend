import { Router } from 'express';

import { mailerController } from '@app/controllers';

const routes = Router();

routes.post('/send-mail', mailerController.sendMail);

export default routes;
