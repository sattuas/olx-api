import { Request, Response, NextFunction } from 'express';
import User from '../models/User';


export const privateRoute = async (req: Request, res: Response, next: NextFunction) => {
    if(!req.query.token && !req.body.token) {
        return res.json({
            notAllowed: true
        });
    }

    let token: string = '';
    if(req.query.token) {
        token = req.query.token as string;
    }
    if(req.body.token) {
        token = req.body.token;
    }

    if(token == '') {
        return res.json({
            notAllowed: true
        });
    }

    const user = await User.findOne({
        token: token
    });

    if(!user) {
        return res.json({
            notAllowed: true
        });
    }

    next();
}


