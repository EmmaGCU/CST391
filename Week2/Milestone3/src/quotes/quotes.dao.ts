import { OkPacket } from 'mysql';
import { execute } from '../services/mysql.connector';
import { Quote } from './quotes.model';
import { quoteQueries } from './quotes.queries';
import { Search } from '../search/search.model';
import * as TagsDao from '../tags/tags.dao'

export const readQuotesByUser = async(userId: number) => {
    return execute<Quote[]>(quoteQueries.readQuotesByUser, [userId]);
};

export const readAllQuotes = async() => {
    return execute<Quote[]>(quoteQueries.readAllQuotes, []);
};

export const readQuotesByQuoteId = async (quoteId: number) => {
    return execute<Quote[]>(quoteQueries.readQuotesByQuoteId, [quoteId]);
};

export const createQuote = async (quote: Quote, authorId: number) => {
    let qStr: string = formatTime(quote.dateAdded.toString());
    console.log("testing" + qStr);
    console.log (quoteQueries.createQuote);
    console.log (quote.userId +' '+ authorId +' '+ quote.text +' '+ quote.comments + ' '+ qStr);
    return execute<OkPacket>(quoteQueries.createQuote, [quote.userId, authorId, quote.text, quote.comments, qStr]);
};

export const updateQuote = async (quote: Quote, authorId: number) => {
    let qStr: string = formatTime(quote.dateAdded.toString());
    return execute<OkPacket>(quoteQueries.updateQuote, [quote.userId, authorId, quote.text, quote.comments, qStr, quote.quoteId]);
};

export const deleteQuote = async (quoteId: number) => {
    return execute<OkPacket>(quoteQueries.deleteQuote, [quoteId]);
};

export const searchQuotes = async(search: Search, userId: number) => {
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
        query += ' AND (authors.first_name like ? OR authors.last_name like ?)'
        authorFirst = '%' + search.author + '%';
        authorLast = '%' + search.author + '%';
        values.push(authorFirst);
        values.push(authorLast);
    }
    if (!search.comments.all) {
        if (search.comments.with) {
            query += " AND comments != ''"
        }
        else {
            query += " AND comments = ''"
        }
    }

    let quotes = await execute<Quote[]>(query, values);
    console.log(JSON.stringify(quotes));

    for (let i=0; i<quotes.length; i++) {
        try {
            const tags = await TagsDao.readTagsByQuoteId(quotes[i].quoteId);
            quotes[i].tags = tags;
        } catch (error) {
            console.log("Error reading quote tags");
        }
    }

    if (search.tags.length > 0) {
        let removalList = [];
        console.log("-------------------------------------------------");
        console.log(JSON.stringify(quotes));
        console.log("-------------------------------------------------");
        for (let quote=0; quote<quotes.length; quote++) {
            let remove = true;
            for (let quoteTag=0; quoteTag<quotes[quote].tags.length; quoteTag++) {
                for (let searchTag=0; searchTag<search.tags.length; searchTag++) {
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

        for (let rem=removalList.length-1; rem>=0; rem--) {
           quotes.splice(removalList[rem], 1);
        }
    }

    console.log(JSON.stringify(quotes));

    return quotes;
}

function formatTime(time: string): string {
    if (time.charAt(10) == 'T') {
        time = time.substring(0, 10) + " " + time.substring(11, 19);
        console.log("time: " + time);
    }
    return time;
}