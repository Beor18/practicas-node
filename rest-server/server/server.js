//Iniciamos servidor express
require('./config/config');

const express = require('express')
const app = express();

const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

/////////////////////////////////////////////

app.get('/', function(req, res) {
    res.json('Prueba');
});

app.get('/usuarios', function(req, res) {
    res.json('Get usuarios');
});

app.post('/usuarios', function(req, res) {

    let body = req.body;

    if (body.nombre === undefined) {

        res.status(400).json({
            ok: false,
            mensaje: 'El nombre es necesario'
        });

    } else {
        res.json({
            persona: body
        });
    }

});

app.put('/usuarios/:id', function(req, res) {
    let id = req.params.id;

    res.json({
        id
    });
});

app.delete('/usuarios', function(req, res) {
    res.json('Delete usuarios');
});

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto 3000');
});