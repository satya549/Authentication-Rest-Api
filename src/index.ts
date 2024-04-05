import express from 'express';
import http from 'http';
import bodyparser from 'body-parser';
import cookieparser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();

app.use(cors({
    credentials: true,
}));

app.use(compression());
app.use(cookieparser());
app.use(bodyparser.json());

const server = http.createServer(app);

server.listen(3001, () =>{
    console.log('Server running on http://localhost:3001/')
});


const MONGO_URL ='mongodb+srv://satyadev:satyadev@cluster0.bttwlxy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error',(error:Error) => console.log(error));