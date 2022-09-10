import expres from 'express';
import { login, register } from '../controllers/users.controllers.js';
import { validateLogin, validateRegister } from '../middlewares/users.middlewares.js';

const router = expres.Router();

router.post('/sign-in', validateLogin, login);
router.use(validateRegister);
router.post('/sign-up',  validateRegister, register);

export default router;