const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');

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
        password: bcrypt.hashSync(body.password, 10),
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
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {

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
    })
});

app.delete('/usuarios', function(req, res) {
    res.json('Delete usuarios');
});

module.exports = app;