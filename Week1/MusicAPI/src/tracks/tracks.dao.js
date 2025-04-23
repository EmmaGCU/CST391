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
exports.updateTrack = exports.createTrack = exports.readTracks = void 0;
const mysql_connector_1 = require("../services/mysql.connector");
const tracks_queries_1 = require("./tracks.queries");
const readTracks = (albumId) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, mysql_connector_1.execute)(tracks_queries_1.trackQueries.readTracks, [albumId]);
});
exports.readTracks = readTracks;
const createTrack = (track, index, albumId) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, mysql_connector_1.execute)(tracks_queries_1.trackQueries.createTrack, [albumId, track.title, track.number, track.video, track.lyrics]);
});
exports.createTrack = createTrack;
const updateTrack = (track) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, mysql_connector_1.execute)(tracks_queries_1.trackQueries.updateTrack, [track.title, track.number, track.video, track.lyrics, track.trackId]);
});
exports.updateTrack = updateTrack;
//# sourceMappingURL=tracks.dao.js.map