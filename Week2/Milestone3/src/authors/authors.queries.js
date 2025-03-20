"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorQueries = void 0;
exports.authorQueries = {
    readAuthors: 'SELECT author_id as authorId, first_name as authorFirst, last_name as authorLast FROM authors',
    readAuthorsByAuthorId: 'SELECT author_id as authorId, first_name as authorFirst, last_name as authorLast FROM authors WHERE author_id = ?',
    getAuthorIdByName: 'SELECT author_id as authorId, first_name as authorFirst, last_name as authorLast FROM authors WHERE first_name = ? AND last_name = ?',
    createAuthor: 'INSERT INTO authors (first_name, last_name) VALUES (?,?)',
    updateAuthor: 'UPDATE authors SET first_name = ?, last_name = ? WHERE author_id = ?',
    deleteAuthor: 'DELETE FROM authors WHERE author_id = ?'
};
//# sourceMappingURL=authors.queries.js.map