"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); //imports necessary for use within the file
const albums_routes_1 = __importDefault(require("./albums/albums.routes"));
const artists_routes_1 = __importDefault(require("./artists/artists.routes"));
const logger_middleware_1 = __importDefault(require("./middleware/logger.middleware"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const body_parser_1 = __importDefault(require("body-parser"));
dotenv_1.default.config();
const app = (0, express_1.default)(); //initialize the application
const port = 3000; //define the port number
app.use((0, cors_1.default)());
app.use(body_parser_1.default.urlencoded());
app.use(body_parser_1.default.json());
// Make sure you understand the following line of code.
app.use('/', [albums_routes_1.default, artists_routes_1.default]);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, helmet_1.default)());
app.listen(port, () => {
    console.log('Example app listening at http://localhost: ' + port); //Write a message to the console
});
if (process.env.NODE_ENV == 'development') {
    app.use(logger_middleware_1.default);
    console.log(process.env.GREETING + '  in dev mode');
}
//# sourceMappingURL=app.js.map