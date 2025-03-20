//import { addTagsByQuoteId, deleteTag, readTagsByQuoteId, readTagsByTagId, removeTagsByQuoteId } from "./tags.dao";

export const tagQueries = {
    qCreateTag: 'INSERT INTO tags (name) VALUES(?)',
    qReadTags: 'SELECT tag_id as tagId, name FROM tags',
    qReadTagsByTagId: 'SELECT tag_id as tagId, name FROM tags WHERE tag_id = ?',
    qDeleteTag: 'DELETE FROM tags WHERE tag_id = ?',
    qUpdateTag: 'UPDATE tags SET name = ? WHERE id = ?',
    qReadTagsByQuoteId: 'SELECT tags.tag_id as tagId, name FROM tags JOIN quote_tag ON tags.tag_id = quote_tag.tag_id WHERE quote_id = ?',
    qRemoveTagsByQuoteId: 'DELETE FROM quote_tag WHERE quote_id = ? AND tag_id = ?',
    qAddTagsByQuoteId: 'INSERT INTO quote_tag (quote_id, tag_id) VALUES (?,?)',
    qGetTagIdByName: 'SELECT tag_id as tagId, name FROM tags WHERE name = ?'
}