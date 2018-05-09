const express = require('express');

const app = express();


app.use(require('./routes/usuario'));
app.use(require('./routes/login'));

module.exports = app;