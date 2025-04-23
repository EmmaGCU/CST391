"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trackQueries = void 0;
exports.trackQueries = {
    createTrack: 'INSERT INTO tracks (album_id, title, number, video_url) VALUES(?,?,?,?)',
    readTracks: 'SELECT title AS title, number AS trackId, video_url AS video, lyrics AS lyrics FROM music.tracks WHERE album_id = ?',
    updateTrack: 'UPDATE music.tracks SET title = ?, number = ?, video_url = ?, lyrics = ? WHERE id = ?'
};
//# sourceMappingURL=tracks.queries.js.map