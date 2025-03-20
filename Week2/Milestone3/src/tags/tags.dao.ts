import { OkPacket } from 'mysql';
import { execute } from '../services/mysql.connector';
import { Tag } from './tags.model';
import { tagQueries } from './tags.queries';

export const readTags = async () => {
    return execute<Tag[]>(tagQueries.qReadTags, []);
};

export const readTagsByTagId = async (tagId: number) => {
    return execute<Tag[]>(tagQueries.qReadTags, [tagId]);
};

export const createTag = async (tag: Tag) => {
    return execute<OkPacket>(tagQueries.qCreateTag, [tag.name]);
};

export const updateTag = async (tag: Tag) => {
    return execute<OkPacket>(tagQueries.qUpdateTag, [tag.name, tag.tagId]);
}

export const deleteTag = async (tagId: number) => {
    return execute<OkPacket>(tagQueries.qUpdateTag, [tagId]);
}

export const readTagsByQuoteId = async (quoteId: number) => {
    return execute<Tag[]>(tagQueries.qReadTagsByQuoteId, [quoteId]);
};

export const removeTagsByQuoteId = async (quoteId: number, tagId: number) => {
    return execute<OkPacket>(tagQueries.qRemoveTagsByQuoteId, [quoteId, tagId]);
};

export const addTagsByQuoteId = async (quoteId: number, tagId: number) => {
    return execute<OkPacket>(tagQueries.qAddTagsByQuoteId, [quoteId, tagId]);
};

export const getTagIdByName = async (name: string) => {
    return execute<Tag[]>(tagQueries.qGetTagIdByName, [name]);
};