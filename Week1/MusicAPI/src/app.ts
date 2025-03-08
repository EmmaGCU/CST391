import express from 'express'; //imports necessary for use within the file
import albumsRouter from './albums/albums.routes';
import artistsRouter from './artists/artists.routes';
import logger from './middleware/logger.middleware';

const app = express(); //initialize the application
const port = 3000; //define the port number

// Make sure you understand the following line of code.
app.use('/', [albumsRouter, artistsRouter]);

app.listen(port, () => {
    console.log('Example app listening at http://localhost:${port}') //Write a message to the console
})

if (process.env.NODE_ENV == 'development') {
    app.use(logger);
    console.log(process.env.GREETING + '  in dev mode')
}
