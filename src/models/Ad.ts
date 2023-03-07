import { Schema, model, Model, connection } from 'mongoose';


type AdType = {
    idUser: string,
    state: string,
    category: string,
    images: [object],
    dateCreated: Date,
    title: string,
    price: number,
    priceNegotiable: boolean,
    description: string,
    views: number,
    status: string
};

const schema = new Schema<AdType>({
    idUser: {type: String, required: true},
    state: {type: String},
    category: {type: String},
    images: [Object],
    dateCreated: {type: Date},
    title: {type: String},
    price: {type: Number},
    priceNegotiable: {type: Boolean},
    description: {type: String},
    views: {type: Number},
    status: {type: String}
});

const modelName: string = 'Ad';
export default (connection && connection.models[modelName]) ?
    connection.models[modelName] as Model<AdType>
     :
    model<AdType>(modelName, schema);