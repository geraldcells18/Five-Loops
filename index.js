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

const mongo_url = 'mongodb+srv://uhack_db:mnl48islove@cluster0-jve2f.gcp.mongodb.net/test?retryWrites=true&w=majority';
const db_name = 'uhack_db';

var client = new MongoClient(mongo_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


client.connect(error => {

    assert.strictEqual(null, error);
    const db = client.db(db_name);

    /* Consider collection checking when error occured at performing query  */
    const bus = db.collection('bus');
    const stations = db.collection('bus_stations');

    let bs = {
        
        "stations": [{
                "name": "Blue Whale Bus Station",
                "waiting_count": "3",
                "category": "near",
                "location": [{
                    "lat": "14.587222",
                    "long": "120.969400"
                }],
                "next_routes": [{
                        "name": "Daily Express Bus Station",
                        "waiting_count": "3",
                        "category": "near",
                        "location": [{
                            "lat": "14.589085",
                            "long": "120.971293"
                        }]
                    },
                    {
                        "name": "Madrigal Bus Station",
                        "waiting_count": "3",
                        "category": "near",
                        "location": [{
                            "lat": "14.592512",
                            "long": "120.972865"
                        }]
                    },
                    {
                        "name": "Intendancia Bus Station",
                        "waiting_count": "3",
                        "category": "near",
                        "location": [{
                            "lat": "14.593700",
                            "long": "120.974893"
                        }]
                    },

                    {
                        "name": "Lyceum Bus Station",
                        "waiting_count": "3",
                        "category": "near",
                        "location": [{
                            "lat": "14.591889",
                            "long": "120.977591"
                        }]
                    },
                    {
                        "name": "Novales Bus Station",
                        "waiting_count": "3",
                        "category": "near",
                        "location": [{
                            "lat": "14.589553",
                            "long": "120.978025"
                        }]
                    },
                    {
                        "name": "Manila Bus Station",
                        "waiting_count": "3",
                        "category": "near",
                        "location": [{
                            "lat": "14.590347",
                            "long": "120.983165"
                        }]
                    }
                ]
            },
            {
                "name": "White Tiger Bus Station",
                "waiting_count": "5",
                "category": "near",
                "location": [{
                    "lat": "14.588316",
                    "long": "120.970644"
                }],
                "next_routes": [{
                        "name": "Daily Express Bus Station",
                        "waiting_count": "3",
                        "category": "near",
                        "location": [{
                            "lat": "14.589085",
                            "long": "120.971293"
                        }]
                    },
                    {
                        "name": "Madrigal Bus Station",
                        "waiting_count": "3",
                        "category": "near",
                        "location": [{
                            "lat": "14.592512",
                            "long": "120.972865"
                        }]
                    },
                    {
                        "name": "Intendancia Bus Station",
                        "waiting_count": "3",
                        "category": "near",
                        "location": [{
                            "lat": "14.593700",
                            "long": "120.974893"
                        }]
                    },

                    {
                        "name": "Lyceum Bus Station",
                        "waiting_count": "3",
                        "category": "near",
                        "location": [{
                            "lat": "14.591889",
                            "long": "120.977591"
                        }]
                    },
                    {
                        "name": "Novales Bus Station",
                        "waiting_count": "3",
                        "category": "near",
                        "location": [{
                            "lat": "14.589553",
                            "long": "120.978025"
                        }]
                    },
                    {
                        "name": "Manila Bus Station",
                        "waiting_count": "3",
                        "category": "near",
                        "location": [{
                            "lat": "14.590347",
                            "long": "120.983165"
                        }]
                    }
                ]
            },
            {
                "name": "Dragon Bus Station",
                "waiting_count": "11",
                "category": "near",
                "location": [{
                    "lat": "14.586801",
                    "long": "120.970686"
                }],
                "next_routes": [{
                        "name": "Daily Express Bus Station",
                        "waiting_count": "3",
                        "category": "near",
                        "location": [{
                            "lat": "14.589085",
                            "long": "120.971293"
                        }]
                    },
                    {
                        "name": "Madrigal Bus Station",
                        "waiting_count": "3",
                        "category": "near",
                        "location": [{
                            "lat": "14.592512",
                            "long": "120.972865"
                        }]
                    },
                    {
                        "name": "Intendancia Bus Station",
                        "waiting_count": "3",
                        "category": "near",
                        "location": [{
                            "lat": "14.593700",
                            "long": "120.974893"
                        }]
                    },

                    {
                        "name": "Lyceum Bus Station",
                        "waiting_count": "3",
                        "category": "near",
                        "location": [{
                            "lat": "14.591889",
                            "long": "120.977591"
                        }]
                    },
                    {
                        "name": "Novales Bus Station",
                        "waiting_count": "3",
                        "category": "near",
                        "location": [{
                            "lat": "14.589553",
                            "long": "120.978025"
                        }]
                    },
                    {
                        "name": "Manila Bus Station",
                        "waiting_count": "3",
                        "category": "near",
                        "location": [{
                            "lat": "14.590347",
                            "long": "120.983165"
                        }]
                    }
                ]
            }
        ]
    };

    stations.insert(bs).then(r =>{
        console.log(bs);
    });

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

    
    function getBusList() {
        return new Promise((resolve, reject) => {
            bus.find({}).toArray((err, doc) => {
                !err ? resolve(doc) : reject(err);
            });
        });
    }

    function getNearbyBus() {
        return new Promise((resolve, reject) => {
            stations.find({}).toArray((err, doc) => {
                !err ? resolve(doc) : reject(err);
            });
        });
    }

    server.listen(port, () => {
        // io.on('connection', (socket) => {
        //     socket.on('recceive', (data) => {

        //     });
        // });
        console.log(`Server running... @ PORT: ${port}`);
    });

    app.get('/bus', (req, res) => {
        getBusList().then(resolve => {
            res.status(200).send(resolve);
        }).catch(err => {
            res.status(500).send('err');
            console.log(err);
        });
    });

    app.get('/near_bus', (req, res) => {
        getNearbyBus().then(resolve => {
            res.status(200).send(resolve);
        }).catch(err => {
            res.status(500).send('err');
            console.log(err);
        });
    });

});