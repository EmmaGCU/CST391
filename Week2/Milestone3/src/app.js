"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//import express from 'express'; //imports necessary for use within the file
const quotes_routes_1 = __importDefault(require("./quotes/quotes.routes"));
const tags_routes_1 = __importDefault(require("./tags/tags.routes"));
const authors_routes_1 = __importDefault(require("./authors/authors.routes"));
const users_routes_1 = __importDefault(require("./users/users.routes"));
//import logger from './middleware/logger.middleware';
const dotenv_1 = __importDefault(require("dotenv"));
// import cors from 'cors';
// import helmet from 'helmet';
const body_parser_1 = __importDefault(require("body-parser"));
dotenv_1.default.config();
const app = (0, express_1.default)(); //initialize the application
const port = 3000; //define the port number
app.get('/', (req, res) => {
    res.send('HelloWorld from TypeScript!');
});
app.use(body_parser_1.default.urlencoded());
app.use(body_parser_1.default.json());
// // Make sure you understand the following line of code.
app.use('/', [quotes_routes_1.default, authors_routes_1.default, users_routes_1.default, tags_routes_1.default]);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// app.use(cors());
// app.use(helmet());
app.listen(port, () => {
    console.log('Example my app listening at http://localhost:' + port); //Write a message to the console
});
if (process.env.NODE_ENV == 'development') {
    //app.use(logger);
    console.log(process.env.GREETING + '  in dev mode');
}
//# sourceMappingURL=app.js.map