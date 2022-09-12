import expres from 'express';
import { login, register, infos, registerReleases, listReleases, deleteReleases} from '../controllers/users.controllers.js';
import { validateLogin, validateRegister, validateToken, validateReleases } from '../middlewares/users.middlewares.js';

const router = expres.Router();

router.post('/sign-in', validateLogin, login);
router.post('/sign-up',  validateRegister, register);
router.get('/user', validateToken, infos);
router.post('/releases', validateToken, validateReleases, registerReleases);
router.get('/releases', validateToken, listReleases);
router.delete('/releases/:id', validateToken, deleteReleases);

export default router;