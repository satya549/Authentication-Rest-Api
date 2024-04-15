import express from 'express';
import { get, identity, merge } from 'lodash';
import { getUserbySessionToken } from '../model/users';


export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const sessionToken = req.cookies['SATYA-AUTH'];

        if(!sessionToken){
            return res.sendStatus(403)
        }

        const existingUser = await getUserbySessionToken(sessionToken);

        if(!existingUser){
            return res.sendStatus(403);
        };

        merge(req, { identity: existingUser });
        return next();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}