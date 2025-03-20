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
exports.getTagIdByName = exports.addTagsByQuoteId = exports.removeTagsByQuoteId = exports.readTagsByQuoteId = exports.deleteTag = exports.updateTag = exports.createTag = exports.readTagsByTagId = exports.readTags = void 0;
const mysql_connector_1 = require("../services/mysql.connector");
const tags_queries_1 = require("./tags.queries");
const readTags = () => __awaiter(void 0, void 0, void 0, function* () {
    return (0, mysql_connector_1.execute)(tags_queries_1.tagQueries.qReadTags, []);
});
exports.readTags = readTags;
const readTagsByTagId = (tagId) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, mysql_connector_1.execute)(tags_queries_1.tagQueries.qReadTags, [tagId]);
});
exports.readTagsByTagId = readTagsByTagId;
const createTag = (tag) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, mysql_connector_1.execute)(tags_queries_1.tagQueries.qCreateTag, [tag.name]);
});
exports.createTag = createTag;
const updateTag = (tag) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, mysql_connector_1.execute)(tags_queries_1.tagQueries.qUpdateTag, [tag.name, tag.tagId]);
});
exports.updateTag = updateTag;
const deleteTag = (tagId) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, mysql_connector_1.execute)(tags_queries_1.tagQueries.qUpdateTag, [tagId]);
});
exports.deleteTag = deleteTag;
const readTagsByQuoteId = (quoteId) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, mysql_connector_1.execute)(tags_queries_1.tagQueries.qReadTagsByQuoteId, [quoteId]);
});
exports.readTagsByQuoteId = readTagsByQuoteId;
const removeTagsByQuoteId = (quoteId, tagId) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, mysql_connector_1.execute)(tags_queries_1.tagQueries.qRemoveTagsByQuoteId, [quoteId, tagId]);
});
exports.removeTagsByQuoteId = removeTagsByQuoteId;
const addTagsByQuoteId = (quoteId, tagId) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, mysql_connector_1.execute)(tags_queries_1.tagQueries.qAddTagsByQuoteId, [quoteId, tagId]);
});
exports.addTagsByQuoteId = addTagsByQuoteId;
const getTagIdByName = (name) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, mysql_connector_1.execute)(tags_queries_1.tagQueries.qGetTagIdByName, [name]);
});
exports.getTagIdByName = getTagIdByName;
//# sourceMappingURL=tags.dao.js.map