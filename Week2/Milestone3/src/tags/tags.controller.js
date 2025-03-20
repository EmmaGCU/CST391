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
exports.deleteTags = exports.updateTag = exports.createTags = exports.readTags = void 0;
const TagsDao = __importStar(require("./tags.dao"));
const readTags = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let tags;
        let tagId = parseInt(req.query.tagId);
        console.log('tagId', tagId);
        if (Number.isNaN(tagId)) {
            tags = yield TagsDao.readTags();
        }
        else {
            tags = yield TagsDao.readTagsByTagId(tagId);
        }
        res.status(200).json(tags);
    }
    catch (error) {
        console.error('[tags.controller][readTags][Error] ', error);
        res.status(500).json({
            message: 'There was an error when fetching tags'
        });
    }
});
exports.readTags = readTags;
const createTags = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('req.body', req.body);
        const okPacket = yield TagsDao.createTag(req.body);
        console.log('tag', okPacket);
        res.status(200).json(okPacket);
    }
    catch (error) {
        console.error('[tags.controller][createTags][Error] ', error);
        res.status(500).json({
            message: 'There was an error when writing tags'
        });
    }
});
exports.createTags = createTags;
const updateTag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('req.body', req.body);
        const okPacket = yield TagsDao.updateTag(req.body);
        console.log('tag', okPacket);
        res.status(200).json(okPacket);
    }
    catch (error) {
        console.error('[quotes.controller][createTag][Error] ', error);
        res.status(500).json({
            message: 'There was an error when updating quotes'
        });
    }
});
exports.updateTag = updateTag;
const deleteTags = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let tagId = parseInt(req.params.tagId);
        console.log('tagId', tagId);
        if (!Number.isNaN(tagId)) {
            const response = yield TagsDao.deleteTag(tagId);
            res.status(200).json(response);
        }
        else {
            throw new Error("Integer expected for tagId");
        }
    }
    catch (error) {
        console.error('[tags.controller][deleteTag][Error] ', error);
        res.status(500).json({
            message: 'There was an error when deleting tags'
        });
    }
});
exports.deleteTags = deleteTags;
//# sourceMappingURL=tags.controller.js.map