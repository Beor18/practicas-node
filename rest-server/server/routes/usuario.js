const express = require('express');
const Usuario = require('../models/usuario');
const app = express();


// Rutas

app.get('/', function(req, res) {
    res.json('Prueba');
});

app.get('/usuarios', function(req, res) {
    res.json('Get usuarios');
});

app.post('/usuarios', function(req, res) {

    let body = req.body;

    // Definimos variable usuario

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: body.password,
        //img: body.img,
        role: body.role
    });

    // Grabar Usuario en la base de datos

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });

        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });



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

module.exports = app;