import { Router, Request, Response } from 'express';


const router = Router();

router.get('/ping', (req: Request, res: Response) => {
    return res.json({
        pong: true
    });
});


export default router;