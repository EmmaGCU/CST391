import { OkPacket } from 'mysql';
import { execute } from '../services/mysql.connector';
import { Quote } from './quotes.model';
import { quoteQueries } from './quotes.queries';

export const readQuotes = async() => {
    return execute<Quote[]>(quoteQueries.readQuotes, []);
};

export const readQuotesByQuoteId = async (quoteId: number) => {
    return execute<Quote[]>(quoteQueries.readQuotesByQuoteId, [quoteId]);
};

export const createQuote = async (quote: Quote, authorId: number) => {
    console.log (quoteQueries.createQuote);
    console.log (quote.userId +' '+ authorId +' '+ quote.text +' '+ quote.comments + ' '+quote.dateAdded);
    return execute<OkPacket>(quoteQueries.createQuote, [quote.userId, authorId, quote.text, quote.comments, quote.dateAdded]);
};

export const updateQuote = async (quote: Quote, authorId: number) => {
    return execute<OkPacket>(quoteQueries.updateQuote, [quote.userId, authorId, quote.text, quote.comments, quote.dateAdded, quote.quoteId]);
};

export const deleteQuote = async (quoteId: number) => {
    return execute<OkPacket>(quoteQueries.deleteQuote, [quoteId]);
};