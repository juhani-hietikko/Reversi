var connect = require('connect'),
    quip = require('quip'),
    filter = require('filter'),
    socketio = require('socket.io'),
    REST = require('restapi/rest.js');

var dependency = {
    connect: connect
};

var ALLOWED = {
    onlyIf: function(req) {
        return !!req.session.user;
    },
    always: [
        /^\/out\/.*/,
        /^\/app\/.*/,
        /^\/steal\/.*/,
        /^\/jquery\/.*/,
        /^\/rest\/.*/
    ]
};

var WEBROOT = __dirname + '/../client';
connect(
    connect.logger(),
    connect.cookieParser(),
    connect.session({secret: 'super626'}),
    quip(),
    filter(ALLOWED),
    connect.bodyParser(),
    connect.router(REST.create(dependency)),
    connect.static(WEBROOT)
).listen(8080);
console.log("Started static HTTP server at " + WEBROOT);