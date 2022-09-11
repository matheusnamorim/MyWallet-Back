import expres from 'express';
import { login, register, infos, registerReleases, listReleases} from '../controllers/users.controllers.js';
import { validateLogin, validateRegister, validateToken, validateReleases } from '../middlewares/users.middlewares.js';

const router = expres.Router();

router.post('/sign-in', validateLogin, login);
router.post('/sign-up',  validateRegister, register);
router.get('/user', validateToken, infos);
router.post('/releases', validateToken, validateReleases, registerReleases);
router.get('/releases', validateToken, listReleases);

export default router;