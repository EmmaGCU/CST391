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
exports.deleteUser = exports.updateUser = exports.createUser = exports.readUsersByUserId = exports.readUsers = void 0;
const mysql_connector_1 = require("../services/mysql.connector");
const users_queries_1 = require("./users.queries");
const readUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    return (0, mysql_connector_1.execute)(users_queries_1.userQueries.qReadUsers, []);
});
exports.readUsers = readUsers;
const readUsersByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, mysql_connector_1.execute)(users_queries_1.userQueries.qReadUsers, [userId]);
});
exports.readUsersByUserId = readUsersByUserId;
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, mysql_connector_1.execute)(users_queries_1.userQueries.qCreateUser, [user.firstName, user.lastName, user.username, user.password]);
});
exports.createUser = createUser;
const updateUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, mysql_connector_1.execute)(users_queries_1.userQueries.qUpdateUser, [user.firstName, user.lastName, user.username, user.password, user.userId]);
});
exports.updateUser = updateUser;
const deleteUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, mysql_connector_1.execute)(users_queries_1.userQueries.qUpdateUser, [userId]);
});
exports.deleteUser = deleteUser;
//# sourceMappingURL=users.dao.js.map