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
exports.deleteAlbum = exports.updateAlbum = exports.createAlbum = exports.readAlbumsByAlbumId = exports.readAlbumsByDescriptionSearch = exports.readAlbumsByArtistSearch = exports.readAlbumsByArtist = exports.readAlbums = void 0;
const mysql_connector_1 = require("../services/mysql.connector");
const albums_queries_1 = require("./albums.queries");
const readAlbums = () => __awaiter(void 0, void 0, void 0, function* () {
    return (0, mysql_connector_1.execute)(albums_queries_1.albumQueries.readAlbums, []);
});
exports.readAlbums = readAlbums;
const readAlbumsByArtist = (artistName) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, mysql_connector_1.execute)(albums_queries_1.albumQueries.readAlbumsByArtist, [artistName]);
});
exports.readAlbumsByArtist = readAlbumsByArtist;
const readAlbumsByArtistSearch = (search) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('search param: ', search);
    return (0, mysql_connector_1.execute)(albums_queries_1.albumQueries.readAlbumsByArtistSearch, [search]);
});
exports.readAlbumsByArtistSearch = readAlbumsByArtistSearch;
const readAlbumsByDescriptionSearch = (search) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('search param: ', search);
    return (0, mysql_connector_1.execute)(albums_queries_1.albumQueries.readAlbumsByDescriptionSearch, [search]);
});
exports.readAlbumsByDescriptionSearch = readAlbumsByDescriptionSearch;
const readAlbumsByAlbumId = (albumId) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, mysql_connector_1.execute)(albums_queries_1.albumQueries.readAlbumsByAlbumId, [albumId]);
});
exports.readAlbumsByAlbumId = readAlbumsByAlbumId;
const createAlbum = (album) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, mysql_connector_1.execute)(albums_queries_1.albumQueries.createAlbum, [album.title, album.artist, album.description, album.year, album.image]);
});
exports.createAlbum = createAlbum;
const updateAlbum = (album) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, mysql_connector_1.execute)(albums_queries_1.albumQueries.updateAlbum, [album.title, album.artist, album.year, album.image, album.description, album.albumId]);
});
exports.updateAlbum = updateAlbum;
const deleteAlbum = (albumId) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, mysql_connector_1.execute)(albums_queries_1.albumQueries.deleteAlbum, [albumId]);
});
exports.deleteAlbum = deleteAlbum;
//# sourceMappingURL=albums.dao.js.map