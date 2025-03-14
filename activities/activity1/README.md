# Activity 1

- Author:  Emma Gostling
- Date:  14 March 2025

## Introduction

[NodeJS](https://nodejs.org) is a [JavaScript](https://www.w3schools.com/js/) back-end server that is used as the foundation for both [Angular](https://angular.dev/) and [React](https://react.dev/) front-end development.  [Express](https://expressjs.com/) is an application installed along with NodeJS to support a JavaScript back-end server capable of being used as a full-fledged server to support middleware services and implement REST APIs.  Express will be used to support building basic routes and [Representational State Transfer (REST) /Application Programming Interfaces](https://en.wikipedia.org/wiki/REST) that can be consumed by an Angular or React front-end framework.

## Executive Summary

- Activity 1 is an example of a Web Application interfacing to a MySQL Relational Database
     - The Architecture will be utilizing Model View Controller (MVC)
          - Model - the maintainer of the data, e.g. Database
          - View - the User Interface, currently the Web Browser
          - Controller - Middleware and the Management / Coordinator of the Application
     - The products utilized in the activity are the following:
          - [Node JS](https://nodejs.org/en)
          - [Node Package Manager](https://www.npmjs.com/)
          - [Express API](https://expressjs.com/en/api.html)
          - [TypeScript](https://www.typescriptlang.org/)
          - [MySQL](https://www.mysql.com/)
     
## Recording

- The following is a recording
     - This is an online link to watch in a Web Browser
     
     - [Activity 1 Recording](https://youtu.be/imCrXzYdDVQ)

## Environmental Variables 

- The following are the variables defined for the MySQL Database

```
#MySQL Settings
MY_SQL_DB_HOST=127.0.0.1
MY_SQL_DB_USER=root
MY_SQL_DB_PASSWORD=root
MY_SQL_DB_PORT=3306
MY_SQL_DB_DATABASE=music
MY_SQL_DB_CONNECTION_LIMIT=10

#Server Settings
PORT=5000
NODE_ENV=development
GREETING=Hello from the environment file. Be kind to the environment!
```

## Test Links

- The following are test links to validate the application is executing and communicating with the MySQL Database
- The images illustrate the results being display in the Web Browser

|Method|Link|Browser Image|Postman Image|Path Variable / Body|
|--|--|--|--|--|
|GET|http://localhost:5000/albums|[Browser](albums.png)|[Postman](albumsPostman.png)||
|GET|http://localhost:5000/albums/:artist|||artist="The Beatles"|
|GET|http://localhost:5000/albums?albumId=7|[Browser](albumId.png)|[Postman](albumIdPostman.png)||
|GET|http://localhost:5000/albums/search/artist/:search|||search="Beat"|
|GET|http://localhost:5000/albums/search/description/:search|||search=1966|
|POST|http://localhost:5000/albums||[Postman](createAlbum.png)|[Create Album Request](createAlbumRequest.json)|
|PUT|http://localhost:5000/albums|||[Update Album Request](updateAlbumRequest.json)|
|DELETE|http://localhost:5000/albums/:albumId|||albumId=34|
|GET|http://localhost:5000/artists|[Browser](artists.png)|[Postman](artistsPostman.png)||

- This is the System Output displaying the SQL variables, database connection and the GET method being called

![System Output](sysout.png)

## Conclusion

- Explain what you learned on this assignment throughly ...

## Troubleshooting

|Issue|Solution|
|--|--|
|MySQL error: ER_NOT_SUPPORTED_AUTH_MODE Client does not support authentication protocol requested by server; consider upgrading mysql client|create user 'sqluser'@'%' identified with mysql_native_password by 'password';<br><br>grant all privileges on \*.\* to 'sqluser'@'%';<br><br>flush privileges;|
