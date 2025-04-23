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
exports.readArtists = void 0;
const mysql_connector_1 = require("../services/mysql.connector");
const artists_queries_1 = require("./artists.queries");
const readArtists = () => __awaiter(void 0, void 0, void 0, function* () {
    return (0, mysql_connector_1.execute)(artists_queries_1.artistQueries.readArtists, []);
});
exports.readArtists = readArtists;
//# sourceMappingURL=artists.dao.js.map