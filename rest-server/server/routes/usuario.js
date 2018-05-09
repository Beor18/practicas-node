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

    // Paginacion de usuarios 

    let desde = req.query.desde || 0;

    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Usuario.find({}, 'nombre email role estado google img')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });

            }

            // Se agrega conteo de registros
            Usuario.count({}, (err, conteo) => {

                res.json({
                    ok: true,
                    usuarios,
                    cuantos: conteo
                });
            });
        });

    // Fin paginacion de usuarios

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

app.delete('/usuarios/:id', function(req, res) {

    let id = req.params.id;

    // Se agrega metodo borrar usuario

    Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });

        };

        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        }

        res.json({
            ok: true,
            usuario: usuarioBorrado
        });

    });


});

module.exports = app;