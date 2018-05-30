const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();
const http = require('http');
const socketIO = require('socket.io');

const index = require('./routes/index');
const users = require('./routes/users');

// Servidor escuchando en puerto 3000
let server = http.createServer(app);
module.exports.io = socketIO(server);
require('./socketEvento');

const port = process.env.PORT || 3000;

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');

const configDB = require('./config/database');
mongoose.Promise = global.Promise;
mongoose.connect(configDB.url);

// function handler(req, res) {
//     fs.readFile(__dirname + '/perfil.ejs', function(err, data) {
//         if (err) {
//             //Si hay error, mandaremos un mensaje de error 500
//             console.log(err);
//             res.writeHead(500);
//             return res.end('Error loading index.html');
//         }
//         res.writeHead(200);
//         res.end(data);
//     });
// }

// Templates engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ secret: 'shhsecret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use('/', index);
app.use('/users', users);

require('./config/passport')(passport);


app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


app.use(function(err, req, res, next) {

    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};


    res.status(err.status || 500);
    res.render('error');
});



server.listen(port, (err) => {

    if (err) throw new Error(err);

    console.log(`Servidor corriendo en puerto ${ port }`);

});
module.exports = app;