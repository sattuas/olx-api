import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { validationResult, matchedData } from 'express-validator';
import State from '../models/State';
import User from '../models/User';
import Category from '../models/Category';
import Ad from '../models/Ad';


export const getStates = async (req: Request, res: Response) => {
    let states = await State.find();

    return res.json({
        states: states
    });
}


export const info = async (req: Request, res: Response) => {
    let token = req.query.token;
    
    const user = await User.findOne({ token: token });
    const state = await State.findById(user!.state);
    const ads = await Ad.find({ idUser: user!._id.toString() });

    let adList: any[] = [];
    for(let i in ads) {

        const cat = await Category.findById( ads[i].category );

        adList.push({
            id: ads[i]._id,
            status: ads[i].status,
            images: ads[i].images,
            dateCreated: ads[i].dateCreated,
            title: ads[i].dateCreated,
            price: ads[i].price,
            priceNegotiable: ads[i].priceNegotiable,
            description: ads[i].description,
            views: ads[i].views,
            category: cat!.slug
        });
    }

    return res.json({
        name: user!.name,
        email: user!.email,
        state: state!.name,
        ads: adList
    });
}


export const editAction = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.json({
            error: errors.mapped()
        });
    }

    const data = matchedData(req);

    let updates: any = {};

    if(data.name) {
        updates.name = data.name;
    }

    if(data.email) {
        const emailCheck = await User.findOne({ email: data.email });
        if(emailCheck) {
            return res.json({ error: "E-mail já existente" });
        }
        updates.email = data.email;
    }

    if(data.state) {
        if(mongoose.Types.ObjectId.isValid(data.state)) {
            const stateCheck = await State.findById(data.state);
            if(!stateCheck) {
                return res.json({ error: "Estado não existe" });
            }
            updates.state = data.state;
        } else {
            return res.json({ error: "Código de estado inválido" });
        }
    }

    if(data.password) {
        updates.passwordHash = await bcrypt.hash(data.password, 10);
    }

    await User.findOneAndUpdate({ token: data.token }, { $set: updates });

    return res.json({
        response: true
    });
}