import express, {Request, Response} from 'express';
//import express from 'express'; //imports necessary for use within the file
import quotesRouter from './quotes/quotes.routes';
import tagsRouter from './tags/tags.routes';
import authorsRouter from './authors/authors.routes';
import usersRouter from './users/users.routes';
//import logger from './middleware/logger.middleware';
import dotenv from "dotenv";
import cors from 'cors';
// import helmet from 'helmet';
import bodyParser, { urlencoded } from 'body-parser';

dotenv.config();

const app = express(); //initialize the application
const port = 3000; //define the port number

app.use(cors());

app.get('/', (req: Request, res: Response) => {
    res.send('HelloWorld from TypeScript!');
})
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

// // Make sure you understand the following line of code.
app.use('/', [quotesRouter, authorsRouter, usersRouter, tagsRouter]);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(cors());
// app.use(helmet());

app.listen(port, () => {
    console.log('Example my app listening at http://localhost:'+port) //Write a message to the console
})

if (process.env.NODE_ENV == 'development') {
    //app.use(logger);
    console.log(process.env.GREETING + '  in dev mode')
}