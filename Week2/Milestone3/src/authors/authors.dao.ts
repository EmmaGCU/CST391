import { execute } from '../services/mysql.connector';
import { Author } from './authors.model';
import { authorQueries } from './authors.queries';
import { OkPacket } from 'mysql';

export const readAuthors = async () => {
    return execute<Author[]>(authorQueries.readAuthors, []);
};

export const readAuthorsByAuthorId = async (authorId: number) => {
    return execute<Author[]>(authorQueries.readAuthorsByAuthorId, [authorId]);
};

export const createAuthor = async (firstName: string, lastName: string) => {
    return execute<OkPacket>(authorQueries.createAuthor, [firstName, lastName]);
};

export const updateAuthor = async (author: Author) => {
    return execute<OkPacket>(authorQueries.updateAuthor, [author.authorId, author.firstName, author.lastName]);
};

export const deleteAuthor = async (authorId: number) => {
    return execute<OkPacket>(authorQueries.deleteAuthor, [authorId]);
};

export const getAuthorIdByName = async (first: string, last: string) => {
    return execute<Author[]>(authorQueries.getAuthorIdByName, [first, last]);
};