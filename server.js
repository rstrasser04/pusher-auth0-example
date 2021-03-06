var express = require('express');
var path = require('path');
var bodyParser = require("body-parser");
var app = express();
var cors = require('cors');
var Pusher = require('pusher');

var pusher = new Pusher({
    appId: '1079195',
    key: '753fa0e07c31c514709e',
    secret: 'bde7b5753f486cc750e7',
    cluster: 'us2',
    encrypted: true
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.post('/message/send', (req, res) => {
    pusher.trigger( 'private-chatapp', 'messages', {
        message: req.body.message,
        username: req.body.username
    });
    res.sendStatus(200);
});

app.post('/pusher/auth', (req, res) => {
    console.log('POST to /pusher/auth');
    const socketId = req.body.socket_id;
    const channel = req.body.channel_name;
    const auth = pusher.authenticate(socketId, channel);
    res.send(auth);
});

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
