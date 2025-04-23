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
exports.deleteAlbum = exports.updateAlbum = exports.createAlbum = exports.readAlbumsByDescriptionSearch = exports.readAlbumsByArtistSearch = exports.readAlbumsByArtist = exports.readAlbums = void 0;
const AlbumDao = __importStar(require("./albums.dao"));
const TracksDao = __importStar(require("../tracks/tracks.dao"));
const readAlbums = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let albums;
        let albumId = parseInt(req.query.albumId);
        console.log('albumId', albumId);
        if (Number.isNaN(albumId)) {
            albums = yield AlbumDao.readAlbums();
        }
        else {
            albums = yield AlbumDao.readAlbumsByAlbumId(albumId);
        }
        yield readTracks(albums, res);
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(200).json(albums);
    }
    catch (error) {
        console.error('[albums.controller][readAlbums][Error] ', error);
        res.status(500).json({
            message: 'There was an error when fetching albums'
        });
    }
});
exports.readAlbums = readAlbums;
const readAlbumsByArtist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const albums = yield AlbumDao.readAlbumsByArtist(req.params.artist);
        yield readTracks(albums, res);
        res.status(200).json(albums);
    }
    catch (error) {
        console.error('[albums.controller][readAlbums][Error] ', error);
        res.status(500).json({
            message: 'There was an error when fetching albums'
        });
    }
});
exports.readAlbumsByArtist = readAlbumsByArtist;
const readAlbumsByArtistSearch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Yippee!");
        const albums = yield AlbumDao.readAlbumsByArtistSearch('%' + req.params.search + '%');
        yield readTracks(albums, res);
        res.status(200).json(albums);
    }
    catch (error) {
        console.error('[albums.controller][readAlbums][Error] ', error);
        res.status(500).json({
            message: 'There was an error when fetching albums'
        });
    }
});
exports.readAlbumsByArtistSearch = readAlbumsByArtistSearch;
const readAlbumsByDescriptionSearch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const albums = yield AlbumDao.readAlbumsByDescriptionSearch('%' + req.params.search + '%');
        yield readTracks(albums, res);
        res.status(200).json(albums);
    }
    catch (error) {
        console.error('[albums.controller][readAlbums][Error] ', error);
        res.status(500).json({
            message: 'There was an error when fetching albums'
        });
    }
});
exports.readAlbumsByDescriptionSearch = readAlbumsByDescriptionSearch;
const createAlbum = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('req.body', req.body);
        const okPacket = yield AlbumDao.createAlbum(req.body);
        console.log('album', okPacket);
        req.body.tracks.forEach((track, index) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield TracksDao.createTrack(track, index, okPacket.insertId);
            }
            catch (error) {
                console.error('[albums.controller][createAlbumTracks][Error] ', error);
                res.status(500).json({
                    message: 'There was an error when writitng album tracks'
                });
            }
        }));
        res.status(200).json(okPacket);
    }
    catch (error) {
        console.error('[albums.controller][createAlbum][Error] ', error);
        res.status(500).json({
            message: 'There was an error when writing albums'
        });
    }
});
exports.createAlbum = createAlbum;
const updateAlbum = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('req.body', req.body);
        const okPacket = yield AlbumDao.updateAlbum(req.body);
        console.log('album', okPacket);
        req.body.tracks.forEach((track, index) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield TracksDao.updateTrack(track);
            }
            catch (error) {
                console.error('[albums.controller][updateAlbumTracks][Error] ', error);
                res.status(500).json({
                    message: 'There was an error when updating album tracks'
                });
            }
        }));
        res.status(200).json(okPacket);
    }
    catch (error) {
        console.error('[albums.controller][createAlbum][Error] ', error);
        res.status(500).json({
            message: 'There was an error when updating albums'
        });
    }
});
exports.updateAlbum = updateAlbum;
const deleteAlbum = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let albumId = parseInt(req.params.albumId);
        console.log('albumId', albumId);
        if (!Number.isNaN(albumId)) {
            const response = yield AlbumDao.deleteAlbum(albumId);
            res.status(200).json(response);
        }
        else {
            throw new Error("Integer expected for albumId");
        }
    }
    catch (error) {
        console.error('[albums.controller][deleteAlbum][Error] ', error);
        res.status(500).json({
            message: 'There was an error when deleting albums'
        });
    }
});
exports.deleteAlbum = deleteAlbum;
function readTracks(albums, res) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < albums.length; i++) {
            try {
                const tracks = yield TracksDao.readTracks(albums[i].albumId);
                albums[i].tracks = tracks;
            }
            catch (error) {
                console.error('[albums.controller][readTracks][Error] ', error);
                res.status(500).json({
                    message: 'There was an error when fetching aalbum tracks'
                });
            }
        }
    });
}
//# sourceMappingURL=albums.controller.js.map