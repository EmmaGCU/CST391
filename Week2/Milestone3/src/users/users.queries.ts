//import { addTagsByQuoteId, deleteTag, readTagsByQuoteId, readTagsByTagId, removeTagsByQuoteId } from "./tags.dao";

export const userQueries = {
    qCreateUser: 'INSERT INTO users (first_name, last_name, username, password) VALUES(?,?,?,?)',
    qReadUsers: 'SELECT user_id as userId, first_name as firstName, last_name as lastName, username, password FROM users',
    qReadUsersByUserId: 'SELECT user_id as userId, first_name as firstName, last_name as lastName, username, password FROM users WHERE user_id = ?',
    qDeleteUser: 'DELETE FROM users WHERE user_id = ?',
    qUpdateUser: 'UPDATE users SET first_name = ?, last_name = ?, username = ?, password = ? WHERE id = ?',
    qReadUsersByUsername: 'SELECT user_id as userId, first_name as firstName, last_name as lastName, username, password FROM users WHERE username = ?'
}