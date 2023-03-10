import { Request, Response } from 'express';
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
    // ...
}