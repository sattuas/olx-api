import { Router, Request, Response } from 'express';
import * as AdsController from '../controllers/adsController';
import * as AuthController from '../controllers/authController';
import * as UserController from '../controllers/userController';

const router = Router();

// to test the api
router.get('/ping', (req: Request, res: Response) => {
    return res.json({
        pong: true
    });
});

router.get('/states', UserController.getStates);

router.post('/user/signin', AuthController.signIn);
router.post('/user/signup', AuthController.signUp);

router.get('/user/me', UserController.info);
router.put('/user/me', UserController.editAction);

router.get('/categories', AdsController.getCategories);

router.post('/ad/add', AdsController.addAction);
router.get('/ad/list', AdsController.getList);
router.get('/ad/item', AdsController.getItem);
router.post('/ad/:id', AdsController.editAction);

export default router;