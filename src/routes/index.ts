import { Router, Request, Response } from 'express';
import * as AdsController from '../controllers/adsController';
import * as AuthController from '../controllers/authController';
import * as UserController from '../controllers/userController';
import * as Auth from '../middlewares/Auth';
import * as AuthValidator from '../validators/AuthValidator';


const router = Router();

// to test the api
router.get('/ping', (req: Request, res: Response) => {
    return res.json({
        pong: true
    });
});

router.get('/states', UserController.getStates);

router.post('/user/signin', AuthValidator.signup, AuthController.signIn);
router.post('/user/signup', AuthValidator.signup, AuthController.signUp);

router.get('/user/me', Auth.privateRoute, UserController.info);
router.put('/user/me', Auth.privateRoute, UserController.editAction);

router.get('/categories', AdsController.getCategories);

router.post('/ad/add', Auth.privateRoute, AdsController.addAction);
router.get('/ad/list', AdsController.getList);
router.get('/ad/item', AdsController.getItem);
router.post('/ad/:id', Auth.privateRoute, AdsController.editAction);

export default router;