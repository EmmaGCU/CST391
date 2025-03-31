"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteQuote = exports.updateQuote = exports.createQuote = exports.readQuotesByQuoteId = exports.readQuotes = void 0;
const mysql_connector_1 = require("../services/mysql.connector");
const quotes_queries_1 = require("./quotes.queries");
const readQuotes = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, mysql_connector_1.execute)(quotes_queries_1.quoteQueries.readQuotes, [userId]);
});
exports.readQuotes = readQuotes;
const readQuotesByQuoteId = (quoteId) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, mysql_connector_1.execute)(quotes_queries_1.quoteQueries.readQuotesByQuoteId, [quoteId]);
});
exports.readQuotesByQuoteId = readQuotesByQuoteId;
const createQuote = (quote, authorId) => __awaiter(void 0, void 0, void 0, function* () {
    let qStr = quote.dateAdded.toString();
    if (qStr.charAt(10) == 'T') {
        qStr = qStr.substring(0, 10) + " " + qStr.substring(11, 19);
        console.log("qStr: " + qStr);
    }
    console.log("testing" + qStr);
    console.log(quotes_queries_1.quoteQueries.createQuote);
    console.log(quote.userId + ' ' + authorId + ' ' + quote.text + ' ' + quote.comments + ' ' + qStr);
    return (0, mysql_connector_1.execute)(quotes_queries_1.quoteQueries.createQuote, [quote.userId, authorId, quote.text, quote.comments, qStr]);
});
exports.createQuote = createQuote;
const updateQuote = (quote, authorId) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, mysql_connector_1.execute)(quotes_queries_1.quoteQueries.updateQuote, [quote.userId, authorId, quote.text, quote.comments, quote.dateAdded, quote.quoteId]);
});
exports.updateQuote = updateQuote;
const deleteQuote = (quoteId) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, mysql_connector_1.execute)(quotes_queries_1.quoteQueries.deleteQuote, [quoteId]);
});
exports.deleteQuote = deleteQuote;
//# sourceMappingURL=quotes.dao.js.map