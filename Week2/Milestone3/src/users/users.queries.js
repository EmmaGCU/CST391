"use strict";
//import { addTagsByQuoteId, deleteTag, readTagsByQuoteId, readTagsByTagId, removeTagsByQuoteId } from "./tags.dao";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userQueries = void 0;
exports.userQueries = {
    qCreateUser: 'INSERT INTO users (first_name, last_name, username, password) VALUES(?,?,?,?)',
    qReadUsers: 'SELECT user_id as userId, first_name as firstName, last_name as lastName, username, password FROM users',
    qReadUsersByUserId: 'SELECT user_id as userId, first_name as firstName, last_name as lastName, username, password FROM tags WHERE user_id = ?',
    qDeleteUser: 'DELETE FROM users WHERE user_id = ?',
    qUpdateUser: 'UPDATE users SET first_name = ?, last_name = ?, username = ?, password = ? WHERE id = ?'
};
//# sourceMappingURL=users.queries.js.map