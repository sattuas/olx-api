import mongoose from 'mongoose';
import { Request, Response } from 'express';
import { validationResult, matchedData } from 'express-validator';
import User from '../models/User';
import State from '../models/State';
import bcrypt from 'bcrypt';


export const signIn = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.json({
            error: errors.mapped()
        });
    }

    const data = matchedData(req);

    // validating the email
    const user = await User.findOne({
        email: data.email
    });

    if(!user) {
        return res.json({ error: "E-mail e/ou senha errados!" });
    }

    // validating the email
    const match = await bcrypt.compare(data.password, user.passwordHash);
    if(!match) {
        return res.json({ error: "E-mail e/ou senha errados!" });
    }

    const payload = (Date.now() + Math.random()).toString();
    const token = await bcrypt.hash(payload, 10);

    user.token = token;
    await user.save();

    return res.json({
        token: token,
        email: data.email
    });
}


export const signUp = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.json({
            error: errors.mapped()
        });
    }
    const data = matchedData(req);

    // checking if email already exists
    const user = await User.findOne({
        email: data.email
    })
    if(user) {
        return res.json({
            error: {
                email: { msg: "Email already exists" }
            }
        })
    }

    // checking if state exists
    if(mongoose.Types.ObjectId.isValid(data.state)) {
        const stateItem = await State.findById(data.state);
        if(!stateItem) {
            return res.json({
                error: {
                    email: { state: "State does not exist" }
                }
            })
        }
    } else {
        return res.json({
            error: {
                email: { state: "Invalid state code" }
            }
        })
    }

    const passwordHash = await bcrypt.hash(data.password, 10);

    const payload = (Date.now() + Math.random()).toString();
    const token = await bcrypt.hash(payload, 10);

    const newuser = new User({
        name: data.name,
        email: data.email,
        passwordHash: passwordHash,
        token: token,
        state: data.state
    });

    await newuser.save();

    return res.json({token});
}