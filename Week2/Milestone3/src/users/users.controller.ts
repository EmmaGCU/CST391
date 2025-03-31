import { Request, RequestHandler, Response } from 'express';
import { User } from './users.model';
import * as UsersDao from './users.dao';
import { OkPacket } from 'mysql';

export const readUsers: RequestHandler = async (req: Request, res: Response) => {
    try {
        let users;
        let userId = parseInt(req.query.userId as string); 
        let username = req.query.username as string;
        
        console.log('userId', userId);
        if (!Number.isNaN(userId)) {
            users = await UsersDao.readUsersByUserId(userId);
        } else if (username != null) {
            users = await UsersDao.readUsersByUsername(username);
            console.log("Search by Username");
        }
        else {
            users = await UsersDao.readUsers();
        }

        res.status(200).json(users);
    } catch (error) {
        console.error('[users.controller][readUsers][Error] ', error);
        res.status(500).json({
            message: 'There was an error when fetching users'
        });
    }
};

export const createUser: RequestHandler = async (req: Request, res: Response) => {
    try {
        console.log('req.body', req.body);
        const okPacket: OkPacket = await UsersDao.createUser(req.body);

        console.log('user', okPacket);

        res.status(200).json(okPacket);
    } catch (error) {
        console.error('[users.controller][createUser][Error] ', error);
        res.status(500).json({
            message: 'There was an error when writing users'
        });
    }
};

export const updateUser: RequestHandler = async (req: Request, res: Response) => {
    try {
        console.log('req.body', req.body);
        const okPacket: OkPacket = await UsersDao.updateUser(req.body);

        console.log('user', okPacket);

        res.status(200).json(okPacket);
    } catch (error) {
        console.error('[users.controller][updateUser][Error] ', error);
        res.status(500).json({
            message: 'There was an error when updating the user'
        });
    }
};

export const deleteUsers: RequestHandler = async (req: Request, res: Response) => {
    try {
        let userId = parseInt(req.params.userId as string);

        console.log('userId', userId);
        if (!Number.isNaN(userId)) {
            const response = await UsersDao.deleteUser(userId);

            res.status(200).json(
                response
            );
        } else {
            throw new Error("Integer expected for userId");
        }
    } catch (error) {
        console.error('[users.controller][deleteUser][Error] ', error);
        res.status(500).json({
            message: 'There was an error when deleting the user'
        });
    }
};