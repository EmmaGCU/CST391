"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = void 0;
const mysql_1 = require("mysql");
let pool = null;
const initializeMySqlConnector = () => {
    try {
        pool = (0, mysql_1.createPool)({
            connectionLimit: parseInt(process.env.MY_SQL_DB_CONNECTION_LIMIT != undefined ? process.env.MY_SQL_DB_CONNECTION_LIMIT : ""),
            port: parseInt(process.env.MY_SQL_DB_PORT != undefined ? process.env.MY_SQL_DB_PORT : ""),
            host: process.env.MY_SQL_DB_HOST,
            user: process.env.MY_SQL_DB_USER,
            password: process.env.MY_SQL_DB_PASSWORD,
            database: process.env.MY_SQL_DB_DATABASE
        });
        console.debug("MySql Adapter Pool generated successfully");
        console.log('process.env.DB_DATABASE', process.env.MY_SQL_DB_DATABASE);
        pool.getConnection((err, connection) => {
            if (err) {
                console.log('error mysql failed to connect: ' + err.message);
                throw new Error('not able to connect to database');
            }
            else {
                console.log('connection made');
                connection.release();
            }
        });
    }
    catch (error) {
        console.error('[mysql.connector][initializeMySqlConnector][Error]: ', error);
        throw new Error('failed to initialize pool');
    }
};
const execute = (query, params) => {
    try {
        if (!pool) {
            initializeMySqlConnector();
        }
        return new Promise((resolve, reject) => {
            pool.query(query, params, (error, results) => {
                if (error)
                    reject(error);
                else
                    resolve(results);
            });
        });
    }
    catch (error) {
        console.error('[mysql.connector][execute][Error]: ', error);
        throw new Error('failed to execute MySQL query');
    }
};
exports.execute = execute;
//# sourceMappingURL=mysql.connector.js.map