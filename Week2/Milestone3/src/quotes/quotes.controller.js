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
exports.searchQuotes = exports.deleteQuotes = exports.updateQuotes = exports.createQuotes = exports.readQuotes = void 0;
const QuoteDao = __importStar(require("./quotes.dao"));
const TagsDao = __importStar(require("../tags/tags.dao"));
const AuthorDao = __importStar(require("../authors/authors.dao"));
const readQuotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Hello");
        let quotes;
        let quoteId = parseInt(req.query.quoteId);
        let userId = parseInt(req.query.userId);
        console.log('quoteId', quoteId);
        if (Number.isNaN(quoteId)) {
            quotes = yield QuoteDao.readQuotes(userId);
        }
        else {
            quotes = yield QuoteDao.readQuotesByQuoteId(quoteId);
        }
        yield readQuoteTags(quotes, res);
        res.status(200).json(quotes);
    }
    catch (error) {
        console.error('[quotes.controller][readQuotes][Error] ', error);
        res.status(500).json({
            message: 'There was an error when fetching quotes'
        });
    }
});
exports.readQuotes = readQuotes;
const createQuotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('req.body', req.body);
        let authorId = 0;
        try {
            authorId = (yield AuthorDao.createAuthor(req.body.authorFirst, req.body.authorLast)).insertId;
        }
        catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                let auth = (yield AuthorDao.getAuthorIdByName(req.body.authorFirst, req.body.authorLast));
                authorId = auth[0].authorId;
            }
            else {
                console.error('An error occured: ', error);
            }
        }
        const okPacket = yield QuoteDao.createQuote(req.body, authorId);
        console.log('quote', okPacket);
        req.body.tags.forEach((tag) => __awaiter(void 0, void 0, void 0, function* () {
            let tagId = 0;
            try {
                tagId = (yield TagsDao.createTag(tag)).insertId;
            }
            catch (error) {
                if (error.code === 'ER_DUP_ENTRY') {
                    let tagRes = (yield TagsDao.getTagIdByName(tag.name));
                    tagId = tagRes[0].tagId;
                }
                else {
                    console.error('An error occured: ', error);
                }
            }
            try {
                yield TagsDao.addTagsByQuoteId(okPacket.insertId, tagId);
            }
            catch (error) {
                console.error('An error occured: ', error);
            }
        }));
        // req.body.tags.forEach(async (tag: Tag, index: number) => {
        //     try {
        //         await TagsDao.createTag(tag, index, okPacket.insertId);
        //     } catch (error) {
        //         console.error('[quotes.controller][createQuoteTags][Error] ', error);
        //         res.status(500).json({
        //             message: 'There was an error when writitng quote tags'
        //         });
        //     }
        // });
        res.status(200).json(okPacket);
    }
    catch (error) {
        console.error('[quotes.controller][createQuote][Error] ', error);
        res.status(500).json({
            message: 'There was an error when writing quotes'
        });
    }
});
exports.createQuotes = createQuotes;
const updateQuotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('req.body', req.body);
        let authorId = 0;
        try {
            authorId = (yield AuthorDao.createAuthor(req.body.authorFirst, req.body.authorLast)).insertId;
        }
        catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                let auth = (yield AuthorDao.getAuthorIdByName(req.body.authorFirst, req.body.authorLast));
                authorId = auth[0].authorId;
            }
            else {
                console.error('An error occured: ', error);
            }
        }
        const okPacket = yield QuoteDao.updateQuote(req.body, authorId);
        console.log('quote', okPacket);
        req.body.tags.forEach((tag) => __awaiter(void 0, void 0, void 0, function* () {
            let tagId = 0;
            try {
                tagId = (yield TagsDao.createTag(tag)).insertId;
            }
            catch (error) {
                if (error.code === 'ER_DUP_ENTRY') {
                    let tagRes = (yield TagsDao.getTagIdByName(tag.name));
                    tagId = tagRes[0].tagId;
                }
                else {
                    console.error('An error occured: ', error);
                }
            }
            try {
                yield TagsDao.addTagsByQuoteId(req.body.quoteId, tagId);
            }
            catch (error) {
                if (error.code === 'ER_DUP_ENTRY') { }
                else {
                    console.error('An error occured: ', error);
                }
            }
        }));
        yield removeQuoteTags(req.body.quoteId, req.body.tags);
        res.status(200).json(okPacket);
    }
    catch (error) {
        console.error('[quotes.controller][createQuote][Error] ', error);
        res.status(500).json({
            message: 'There was an error when updating quotes'
        });
    }
});
exports.updateQuotes = updateQuotes;
const deleteQuotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let quoteId = parseInt(req.params.quoteId);
        console.log('quoteId', quoteId);
        if (!Number.isNaN(quoteId)) {
            const response = yield QuoteDao.deleteQuote(quoteId);
            res.status(200).json(response);
        }
        else {
            throw new Error("Integer expected for quoteId");
        }
    }
    catch (error) {
        console.error('[quotes.controller][deleteQuote][Error] ', error);
        res.status(500).json({
            message: 'There was an error when deleting quotes'
        });
    }
});
exports.deleteQuotes = deleteQuotes;
function readQuoteTags(quotes, res) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < quotes.length; i++) {
            try {
                const tags = yield TagsDao.readTagsByQuoteId(quotes[i].quoteId);
                quotes[i].tags = tags;
            }
            catch (error) {
                console.error('[quotes.controller][readQuotes][Error] ', error);
                res.status(500).json({
                    message: 'There was an error when fetching quote tags'
                });
            }
        }
    });
}
function removeQuoteTags(quoteId, tags) {
    return __awaiter(this, void 0, void 0, function* () {
        let currTags = yield TagsDao.readTagsByQuoteId(quoteId);
        for (let currTag = 0; currTag < currTags.length; currTag++) {
            let remove = true;
            for (let updatedTag = 0; updatedTag < tags.length; updatedTag++) {
                let updatedTagId = 0;
                try {
                    updatedTagId = (yield TagsDao.createTag(tags[updatedTag])).insertId;
                }
                catch (error) {
                    if (error.code === 'ER_DUP_ENTRY') {
                        let tagRes = (yield TagsDao.getTagIdByName(tags[updatedTag].name));
                        updatedTagId = tagRes[0].tagId;
                    }
                    else {
                        console.error('An error occured: ', error);
                    }
                }
                if (currTags[currTag].tagId === updatedTagId) {
                    remove = false;
                    break;
                }
            }
            if (remove) {
                yield TagsDao.removeTagsByQuoteId(quoteId, currTags[currTag].tagId);
            }
        }
    });
}
const searchQuotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Hello from search: controller");
        let quotes;
        let userId = parseInt(req.query.userId);
        let search = req.body;
        //console.log(JSON.stringify(req.body));
        console.log("In QuotesController: searchQuotes()... \n" + JSON.stringify(search));
        quotes = yield QuoteDao.searchQuotes(search, userId);
        res.status(200).json(quotes);
    }
    catch (error) {
        console.error('[quotes.controller][readQuotes][Error] ', error);
        res.status(500).json({
            message: 'There was an error when fetching quotes'
        });
    }
});
exports.searchQuotes = searchQuotes;
//# sourceMappingURL=quotes.controller.js.map