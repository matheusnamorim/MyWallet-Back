import expres from 'express';
import { login, register, info } from '../controllers/users.controllers.js';
import { validateLogin, validateRegister } from '../middlewares/users.middlewares.js';

const router = expres.Router();

router.post('/sign-in', validateLogin, login);
router.post('/sign-up',  validateRegister, register);
router.get('/user', info);

export default router;