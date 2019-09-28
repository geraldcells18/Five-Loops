//@ts-check
const cors = require('cors');
const mysql = require('mysql');
const assert = require('assert');
const cron = require('node-cron');
const express = require('express');
const moment = require('moment-timezone');
const bodyParser = require('body-parser');
const timeout = require('connect-timeout');

const ObjectId = require('mongodb').ObjectId;
const MongoClient = require('mongodb').MongoClient;

const app = express();
let port = process.env.PORT || 5000

const http = require('http');
const server = new http.Server(app);
const io = require('socket.io')(server);

app.use(cors());
app.use(timeout('7s'));
app.use(bodyParser.json());

// This code used to override the MaxListener for an event listeners (For the purpose of SOCKET and Event Leakage Warning)
const EventEmitter = require('events');
class MyEmitter extends EventEmitter {}

//const mongo_url = 'mongodb+srv://uhack_db:neropromises@cluster0-jve2f.gcp.mongodb.net/test?retryWrites=true&w=majority';

const db_name = 'bus';
const mongo_url = 'mongodb://127.0.0.1:27017/uhack_db';

var client = new MongoClient(mongo_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

server.listen(port, () => {

    // io.on('connection', (socket) => {
    //     socket.on('recceive', (data) => {

    //     });
    // });

    console.log(`Server running... @ PORT: ${port}`);

});


client.connect(err => {
    
    assert.strictEqual(null, err);
    const db = client.db(db_name);

    /* Consider collection checking when error occured at performing query  */
    const user_col = db.collection('user_client');

    /**
     *
     * Check the object if its contains some value.
     * Returns true if the given object is not empty.
     * @param obj the object to be check if its empty or not.
     *
     */
    function checkObjects(obj = {}) {
        return Object.keys(obj).length > 0;
    }

});