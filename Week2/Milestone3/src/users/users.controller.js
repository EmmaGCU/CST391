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
exports.deleteUsers = exports.updateUser = exports.createUser = exports.readUsers = void 0;
const UsersDao = __importStar(require("./users.dao"));
const readUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let users;
        let userId = parseInt(req.query.userId);
        let username = req.query.username;
        console.log('userId', userId);
        if (!Number.isNaN(userId)) {
            users = yield UsersDao.readUsersByUserId(userId);
        }
        else if (username != null) {
            users = yield UsersDao.readUsersByUsername(username);
            console.log("Search by Username");
        }
        else {
            users = yield UsersDao.readUsers();
        }
        res.status(200).json(users);
    }
    catch (error) {
        console.error('[users.controller][readUsers][Error] ', error);
        res.status(500).json({
            message: 'There was an error when fetching users'
        });
    }
});
exports.readUsers = readUsers;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('req.body', req.body);
        const okPacket = yield UsersDao.createUser(req.body);
        console.log('user', okPacket);
        res.status(200).json(okPacket);
    }
    catch (error) {
        console.error('[users.controller][createUser][Error] ', error);
        res.status(500).json({
            message: 'There was an error when writing users'
        });
    }
});
exports.createUser = createUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('req.body', req.body);
        const okPacket = yield UsersDao.updateUser(req.body);
        console.log('user', okPacket);
        res.status(200).json(okPacket);
    }
    catch (error) {
        console.error('[users.controller][updateUser][Error] ', error);
        res.status(500).json({
            message: 'There was an error when updating the user'
        });
    }
});
exports.updateUser = updateUser;
const deleteUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let userId = parseInt(req.params.userId);
        console.log('userId', userId);
        if (!Number.isNaN(userId)) {
            const response = yield UsersDao.deleteUser(userId);
            res.status(200).json(response);
        }
        else {
            throw new Error("Integer expected for userId");
        }
    }
    catch (error) {
        console.error('[users.controller][deleteUser][Error] ', error);
        res.status(500).json({
            message: 'There was an error when deleting the user'
        });
    }
});
exports.deleteUsers = deleteUsers;
//# sourceMappingURL=users.controller.js.map