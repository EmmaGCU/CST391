import { Request, RequestHandler, Response } from 'express';
import * as AuthorDao from './authors.dao';
import { OkPacket } from 'mysql';

export const readAuthors: RequestHandler = async (req: Request, res: Response) => {
    try {
        let authors;
        let authorId = parseInt(req.query.authorId as string); 
        
        console.log('authorId', authorId);
        if (Number.isNaN(authorId)) {
            authors = await AuthorDao.readAuthors();
        } else {
            authors = await AuthorDao.readAuthorsByAuthorId(authorId);
        }

        res.status(200).json(authors);
    } catch (error) {
        console.error('[authors.controller][readAuthors][Error] ', error);
        res.status(500).json({
            message: 'There was an error when fetching authors'
        });
    }
};

export const createAuthors: RequestHandler = async (req: Request, res: Response) => {
    try {
        console.log('req.body', req.body);
        const okPacket: OkPacket = await AuthorDao.createAuthor(req.body.authorFirst, req.body.authorLast);

        console.log('author', okPacket);

        res.status(200).json(okPacket);
    } catch (error) {
        console.error('[authors.controller][createAuthor][Error] ', error);
        res.status(500).json({
            message: 'There was an error when writing authors'
        });
    }
};

export const updateAuthor: RequestHandler = async (req: Request, res: Response) => {
    try {
        console.log('req.body', req.body);
        const okPacket: OkPacket = await AuthorDao.updateAuthor(req.body);

        console.log('author', okPacket);

        res.status(200).json(okPacket);
    } catch (error) {
        console.error('[authors.controller][createAuthor][Error] ', error);
        res.status(500).json({
            message: 'There was an error when updating authors'
        });
    }
};

export const deleteAuthors: RequestHandler = async (req: Request, res: Response) => {
    try {
        let authorId = parseInt(req.params.authorId as string);

        console.log('authorId', authorId);
        if (!Number.isNaN(authorId)) {
            const response = await AuthorDao.deleteAuthor(authorId);

            res.status(200).json(
                response
            );
        } else {
            throw new Error("Integer expected for authorId");
        }
    } catch (error) {
        console.error('[authors.controller][deleteAuthor][Error] ', error);
        res.status(500).json({
            message: 'There was an error when deleting authors'
        });
    }
};