"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quoteQueries = void 0;
exports.quoteQueries = {
    readQuotes: 'SELECT quote_id as quoteId, user_id as userId, authors.author_id as authorId, first_name as authorFirst, last_name as authorLast, text, comments, date_added as dateAdded FROM quotes JOIN authors ON quotes.author_id = authors.author_id',
    readQuotesByQuoteId: 'SELECT quote_id as quoteId, user_id as userId, authors.author_id as authorId, first_name as authorFirst, last_name as authorLast, text, comments, date_added as dateAdded FROM quotes JOIN authors ON quotes.author_id = authors.author_id WHERE quote_id = ?',
    createQuote: 'INSERT INTO quotes(user_id, author_id, text, comments, date_added) VALUES(?,?,?,?,?)',
    updateQuote: 'UPDATE quotes SET user_id = ?, author_id = ?, text = ?, comments = ?, date_added = ? WHERE quote_id = ?',
    deleteQuote: 'DELETE FROM quotes WHERE quote_id = ?'
};
//# sourceMappingURL=quotes.queries.js.map