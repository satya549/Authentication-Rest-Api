import express from "express";
import { createUser, getUserbyEmail } from "../model/users";
import { authentication, random } from "../helpers";

export const register = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password, username } = req.body;
        if(!email || !password || !username){
            return res.sendStatus(400);
        }
        const existingUser = await getUserbyEmail(email);
        if(existingUser){
            return res.status(400).json({message: "User Already Exists!"});
        }
        const salt = random();
        const user = await createUser({
            email,
            username,
            authentication: {
                salt,
                password: authentication(salt, password),
            },
        });
        return res.status(200).json(user).end();
     } catch (error) {
        console.log(error);
        return res.sendStatus(400);
     }
}

export const login = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.body;

        if(!email || !password){
            return res.sendStatus(400);
        }

        const user = await getUserbyEmail(email).select('+authentication.salt +authentication.password');
        if(!user){
            return res.sendStatus(400);
        }
       const expectedhash = authentication(user.authentication.salt, password);

       if(user.authentication.password != expectedhash){
        return res.sendStatus(403);
       }
      const salt = random();
      user.authentication.sessionToken = authentication(salt, user._id.toHexString());
      
      await user.save();

      res.cookie('SATYA-AUTH', user.authentication.sessionToken, { domain: 'localhost', path: '/' });
      return res.status(200).json(user).end();

    } catch (error) {
        console.log(error)
        return res.sendStatus(400);
    }
}