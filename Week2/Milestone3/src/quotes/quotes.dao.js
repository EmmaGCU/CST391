"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.searchQuotes = exports.deleteQuote = exports.updateQuote = exports.createQuote = exports.readQuotesByQuoteId = exports.readAllQuotes = exports.readQuotesByUser = void 0;
const mysql_connector_1 = require("../services/mysql.connector");
const quotes_queries_1 = require("./quotes.queries");
const TagsDao = __importStar(require("../tags/tags.dao"));
const readQuotesByUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, mysql_connector_1.execute)(quotes_queries_1.quoteQueries.readQuotesByUser, [userId]);
});
exports.readQuotesByUser = readQuotesByUser;
const readAllQuotes = () => __awaiter(void 0, void 0, void 0, function* () {
    return (0, mysql_connector_1.execute)(quotes_queries_1.quoteQueries.readAllQuotes, []);
});
exports.readAllQuotes = readAllQuotes;
const readQuotesByQuoteId = (quoteId) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, mysql_connector_1.execute)(quotes_queries_1.quoteQueries.readQuotesByQuoteId, [quoteId]);
});
exports.readQuotesByQuoteId = readQuotesByQuoteId;
const createQuote = (quote, authorId) => __awaiter(void 0, void 0, void 0, function* () {
    let qStr = formatTime(quote.dateAdded.toString());
    console.log("testing" + qStr);
    console.log(quotes_queries_1.quoteQueries.createQuote);
    console.log(quote.userId + ' ' + authorId + ' ' + quote.text + ' ' + quote.comments + ' ' + qStr);
    return (0, mysql_connector_1.execute)(quotes_queries_1.quoteQueries.createQuote, [quote.userId, authorId, quote.text, quote.comments, qStr]);
});
exports.createQuote = createQuote;
const updateQuote = (quote, authorId) => __awaiter(void 0, void 0, void 0, function* () {
    let qStr = formatTime(quote.dateAdded.toString());
    return (0, mysql_connector_1.execute)(quotes_queries_1.quoteQueries.updateQuote, [quote.userId, authorId, quote.text, quote.comments, qStr, quote.quoteId]);
});
exports.updateQuote = updateQuote;
const deleteQuote = (quoteId) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, mysql_connector_1.execute)(quotes_queries_1.quoteQueries.deleteQuote, [quoteId]);
});
exports.deleteQuote = deleteQuote;
const searchQuotes = (search, userId) => __awaiter(void 0, void 0, void 0, function* () {
    let query = 'SELECT quote_id as quoteId, user_id as userId, authors.author_id as authorId, first_name as authorFirst, last_name as authorLast, text, comments, date_added as dateAdded FROM quotes JOIN authors ON quotes.author_id = authors.author_id WHERE user_id = ?';
    let text = '';
    let authorFirst = '';
    let authorLast = '';
    let values = [];
    values.push(userId);
    if (search.keyword != '') {
        query += ' AND text like ?';
        text = '%' + search.keyword + '%';
        values.push(text);
    }
    if (search.author != '') {
        query += ' AND (authors.first_name like ? OR authors.last_name like ?)';
        authorFirst = '%' + search.author + '%';
        authorLast = '%' + search.author + '%';
        values.push(authorFirst);
        values.push(authorLast);
    }
    if (!search.comments.all) {
        if (search.comments.with) {
            query += " AND comments != ''";
        }
        else {
            query += " AND comments = ''";
        }
    }
    let quotes = yield (0, mysql_connector_1.execute)(query, values);
    console.log(JSON.stringify(quotes));
    for (let i = 0; i < quotes.length; i++) {
        try {
            const tags = yield TagsDao.readTagsByQuoteId(quotes[i].quoteId);
            quotes[i].tags = tags;
        }
        catch (error) {
            console.log("Error reading quote tags");
        }
    }
    if (search.tags.length > 0) {
        let removalList = [];
        console.log("-------------------------------------------------");
        console.log(JSON.stringify(quotes));
        console.log("-------------------------------------------------");
        for (let quote = 0; quote < quotes.length; quote++) {
            let remove = true;
            for (let quoteTag = 0; quoteTag < quotes[quote].tags.length; quoteTag++) {
                for (let searchTag = 0; searchTag < search.tags.length; searchTag++) {
                    if (quotes[quote].tags[quoteTag].tagId == search.tags[searchTag].tagId) {
                        remove = false;
                        break;
                    }
                }
                if (!remove) {
                    break;
                }
            }
            if (remove) {
                removalList.push(quote);
            }
        }
        for (let rem = removalList.length - 1; rem >= 0; rem--) {
            quotes.splice(removalList[rem], 1);
        }
    }
    console.log(JSON.stringify(quotes));
    return quotes;
});
exports.searchQuotes = searchQuotes;
function formatTime(time) {
    if (time.charAt(10) == 'T') {
        time = time.substring(0, 10) + " " + time.substring(11, 19);
        console.log("time: " + time);
    }
    return time;
}
//# sourceMappingURL=quotes.dao.js.map