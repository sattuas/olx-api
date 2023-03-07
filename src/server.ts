import express, { Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import { mongoConnect } from './database/mongo';
import apiRoutes from './routes/index';


dotenv.config();

mongoConnect();

const server = express();

server.use(cors());

server.use(express.static(path.join(__dirname, '../public')))
server.use(express.urlencoded({ extended: true }));

server.use(apiRoutes);

// return status 404 if page not found
server.use((req: Request, res: Response) => {
    res.status(404);
    res.json({
        error: "Endpoint not found"
    });
});

server.listen(process.env.PORT);