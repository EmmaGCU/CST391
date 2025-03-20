import { Request, RequestHandler, Response } from 'express';
import { Quote } from './quotes.model';
import { Tag } from '../tags/tags.model';
import * as QuoteDao from './quotes.dao';
import * as TagsDao from '../tags/tags.dao';
import * as AuthorDao from '../authors/authors.dao';
import { OkPacket } from 'mysql';

export const readQuotes: RequestHandler = async (req: Request, res: Response) => {
    try {
        console.log("Hello");
        let quotes;
        let quoteId = parseInt(req.query.quoteId as string); 
        
        console.log('quoteId', quoteId);
        if (Number.isNaN(quoteId)) {
            quotes = await QuoteDao.readQuotes();
        } else {
            quotes = await QuoteDao.readQuotesByQuoteId(quoteId);
        }
        await readQuoteTags(quotes, res);

        res.status(200).json(quotes);
    } catch (error) {
        console.error('[quotes.controller][readQuotes][Error] ', error);
        res.status(500).json({
            message: 'There was an error when fetching quotes'
        });
    }
};

export const createQuotes: RequestHandler = async (req: Request, res: Response) => {
    try {
        console.log('req.body', req.body);
        let authorId = 0;
        try {
            authorId = (await AuthorDao.createAuthor(req.body.authorFirst, req.body.authorLast)).insertId;
        }
        catch (error: any) {
            if (error.code === 'ER_DUP_ENTRY') {
                let auth = (await AuthorDao.getAuthorIdByName(req.body.authorFirst, req.body.authorLast));
                authorId = auth[0].authorId;
            }
            else {
                console.error('An error occured: ', error);
            }
        }

        const okPacket: OkPacket = await QuoteDao.createQuote(req.body, authorId);
        console.log('quote', okPacket);

        req.body.tags.forEach(async (tag: Tag) => {
            let tagId = 0;
            try {
                tagId = (await TagsDao.createTag(tag)).insertId;
            }
            catch (error: any) {
                if (error.code === 'ER_DUP_ENTRY') {
                    let tagRes = (await TagsDao.getTagIdByName(tag.name));
                    tagId = tagRes[0].tagId;
                }
                else {
                    console.error('An error occured: ', error);
                }
            }

            try {
                await TagsDao.addTagsByQuoteId(okPacket.insertId, tagId)
            } catch (error: any) {
                console.error('An error occured: ', error);
            }
        });

        // req.body.tags.forEach(async (tag: Tag, index: number) => {
        //     try {
        //         await TagsDao.createTag(tag, index, okPacket.insertId);
        //     } catch (error) {
        //         console.error('[quotes.controller][createQuoteTags][Error] ', error);
        //         res.status(500).json({
        //             message: 'There was an error when writitng quote tags'
        //         });
        //     }
        // });

        res.status(200).json(okPacket);
    } catch (error) {
        console.error('[quotes.controller][createQuote][Error] ', error);
        res.status(500).json({
            message: 'There was an error when writing quotes'
        });
    }
};

export const updateQuotes: RequestHandler = async (req: Request, res: Response) => {
    try {
        console.log('req.body', req.body);
        let authorId = 0;
        try {
            authorId = (await AuthorDao.createAuthor(req.body.authorFirst, req.body.authorLast)).insertId;
        }
        catch (error: any) {
            if (error.code === 'ER_DUP_ENTRY') {
                let auth = (await AuthorDao.getAuthorIdByName(req.body.authorFirst, req.body.authorLast));
                authorId = auth[0].authorId;
            }
            else {
                console.error('An error occured: ', error);
            }
        }

        const okPacket: OkPacket = await QuoteDao.updateQuote(req.body, authorId);
        console.log('quote', okPacket);

        req.body.tags.forEach(async (tag: Tag) => {
            let tagId = 0;
            try {
                tagId = (await TagsDao.createTag(tag)).insertId;
            }
            catch (error: any) {
                if (error.code === 'ER_DUP_ENTRY') {
                    let tagRes = (await TagsDao.getTagIdByName(tag.name));
                    tagId = tagRes[0].tagId;
                }
                else {
                    console.error('An error occured: ', error);
                }
            }

            try {
                await TagsDao.addTagsByQuoteId(req.body.quoteId, tagId)
            } catch (error: any) {
                if (error.code === 'ER_DUP_ENTRY') {}
                else {
                    console.error('An error occured: ', error);
                }
            }
        });

        await removeQuoteTags(req.body.quoteId, req.body.tags);

        res.status(200).json(okPacket);
    } catch (error) {
        console.error('[quotes.controller][createQuote][Error] ', error);
        res.status(500).json({
            message: 'There was an error when updating quotes'
        });
    }
};

export const deleteQuotes: RequestHandler = async (req: Request, res: Response) => {
    try {
        let quoteId = parseInt(req.params.quoteId as string);

        console.log('quoteId', quoteId);
        if (!Number.isNaN(quoteId)) {
            const response = await QuoteDao.deleteQuote(quoteId);

            res.status(200).json(
                response
            );
        } else {
            throw new Error("Integer expected for quoteId");
        }
    } catch (error) {
        console.error('[quotes.controller][deleteQuote][Error] ', error);
        res.status(500).json({
            message: 'There was an error when deleting quotes'
        });
    }
};

async function readQuoteTags(quotes: Quote[], res: Response<any, Record<string, any>>) {
    for (let i=0; i<quotes.length; i++) {
        try {
            const tags = await TagsDao.readTagsByQuoteId(quotes[i].quoteId);
            quotes[i].tags = tags;
        } catch (error) {
            console.error('[quotes.controller][readQuotes][Error] ', error);
            res.status(500).json({
                message: 'There was an error when fetching quote tags'
            });
        }
    }
}

async function removeQuoteTags(quoteId: number, tags: Tag[]) {
    let currTags = await TagsDao.readTagsByQuoteId(quoteId);
    for (let currTag = 0; currTag < currTags.length; currTag++) {
        let remove = true;
        for (let updatedTag = 0; updatedTag < tags.length; updatedTag++) {
            let updatedTagId = 0;
            try {
                updatedTagId = (await TagsDao.createTag(tags[updatedTag])).insertId;
            }
            catch (error: any) {
                if (error.code === 'ER_DUP_ENTRY') {
                    let tagRes = (await TagsDao.getTagIdByName(tags[updatedTag].name));
                    updatedTagId = tagRes[0].tagId;
                }
                else {
                    console.error('An error occured: ', error);
                }
            }

            if (currTags[currTag].tagId === updatedTagId) {
                remove = false;
                break;
            }
        }
        if (remove) {
            await TagsDao.removeTagsByQuoteId(quoteId, currTags[currTag].tagId);
        }
    }
}