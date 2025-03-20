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
exports.getAuthorIdByName = exports.deleteAuthor = exports.updateAuthor = exports.createAuthor = exports.readAuthorsByAuthorId = exports.readAuthors = void 0;
const mysql_connector_1 = require("../services/mysql.connector");
const authors_queries_1 = require("./authors.queries");
const readAuthors = () => __awaiter(void 0, void 0, void 0, function* () {
    return (0, mysql_connector_1.execute)(authors_queries_1.authorQueries.readAuthors, []);
});
exports.readAuthors = readAuthors;
const readAuthorsByAuthorId = (authorId) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, mysql_connector_1.execute)(authors_queries_1.authorQueries.readAuthorsByAuthorId, [authorId]);
});
exports.readAuthorsByAuthorId = readAuthorsByAuthorId;
const createAuthor = (firstName, lastName) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, mysql_connector_1.execute)(authors_queries_1.authorQueries.createAuthor, [firstName, lastName]);
});
exports.createAuthor = createAuthor;
const updateAuthor = (author) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, mysql_connector_1.execute)(authors_queries_1.authorQueries.updateAuthor, [author.authorId, author.firstName, author.lastName]);
});
exports.updateAuthor = updateAuthor;
const deleteAuthor = (authorId) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, mysql_connector_1.execute)(authors_queries_1.authorQueries.deleteAuthor, [authorId]);
});
exports.deleteAuthor = deleteAuthor;
const getAuthorIdByName = (first, last) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, mysql_connector_1.execute)(authors_queries_1.authorQueries.getAuthorIdByName, [first, last]);
});
exports.getAuthorIdByName = getAuthorIdByName;
//# sourceMappingURL=authors.dao.js.map