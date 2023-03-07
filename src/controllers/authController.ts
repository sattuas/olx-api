import { Request, Response } from 'express';
import { validationResult, matchedData } from 'express-validator';


export const signIn = async (req: Request, res: Response) => {
    // ...
}


export const signUp = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.json({
            error: errors.mapped()
        });
    }

    const data = matchedData(req);

    return res.json({
        alright: true,
        data: data
    });
}