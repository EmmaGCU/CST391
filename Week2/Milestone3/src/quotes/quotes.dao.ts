import { OkPacket } from 'mysql';
import { execute } from '../services/mysql.connector';
import { Quote } from './quotes.model';
import { quoteQueries } from './quotes.queries';

export const readQuotes = async(userId: number) => {
    return execute<Quote[]>(quoteQueries.readQuotes, [userId]);
};

export const readQuotesByQuoteId = async (quoteId: number) => {
    return execute<Quote[]>(quoteQueries.readQuotesByQuoteId, [quoteId]);
};

export const createQuote = async (quote: Quote, authorId: number) => {
    let qStr: string = quote.dateAdded.toString();
    if (qStr.charAt(10) == 'T') {
        qStr = qStr.substring(0, 10) + " " + qStr.substring(11, 19);
        console.log("qStr: " + qStr);
    }
    console.log("testing" + qStr);
    console.log (quoteQueries.createQuote);
    console.log (quote.userId +' '+ authorId +' '+ quote.text +' '+ quote.comments + ' '+ qStr);
    return execute<OkPacket>(quoteQueries.createQuote, [quote.userId, authorId, quote.text, quote.comments, qStr]);
};

export const updateQuote = async (quote: Quote, authorId: number) => {
    return execute<OkPacket>(quoteQueries.updateQuote, [quote.userId, authorId, quote.text, quote.comments, quote.dateAdded, quote.quoteId]);
};

export const deleteQuote = async (quoteId: number) => {
    return execute<OkPacket>(quoteQueries.deleteQuote, [quoteId]);
};