const express = require('express');
const passport = require('passport');
const router = express.Router();
const path = require('path');

const Productos = require('../models/producto');

const fileUpload = require('express-fileupload');
router.use(fileUpload());


router.get('/', (req, res, next) => {
    res.render('login', { message: req.flash('loginMessaje') });
});

// Solo para el usuario


router.get('/perfil', isLoggedIn, (req, res) => {
    res.render('perfil.ejs', { user: req.user });
});

// Un nuevo CRUD //

router.get('/nuevo', isLoggedIn, (req, res) => {
    Productos.find(function(err, person) {
        if (err) return next(err);
        res.render('nuevo.ejs', {
            user: req.user,
            person
        });
    });
});

router.get('/listar-producto', isLoggedIn, (req, res, next) => {
    Productos.find(function(err, products) {
        if (err) return next(err);
        res.json(products)

    });
    //res.render('nuevo.ejs', { user: req.user, producto: req.productos });
});

router.post('/nuevo', function(req, res) {
    let body = req.body

    let producto = new Productos({
        titulo: body.titulo,
        autor: body.autor,
        descripcion: body.descripcion
    })

    producto.save(() => {
        res.redirect('/nuevo');
    });
});

// EDITAR PRODUCTO FALTA TERMINAR
router.get('/editar/:id', isLoggedIn, (req, res, next) => {
    //let o_id = req.params.id;
    //let titulo = req.params.titulo;

    Productos.findById(req.params.id, function(err, person) {
        if (err) return next(err);
        res.render('editar.ejs', {
            user: req.user,
            person
        });
    });

});

router.put('/update', (req, res) => {

    Productos.findOneAndUpdate(req.params.id, { titulo: req.body.titulo }, function(err, person) {

        if (err) {
            console.log(err);
            res.redirect("/perfil");
        } else {
            res.redirect('/editar/' + _id);
        }

    });
});

// FIN EDITAR PRODUCTO FALTA TERMINAR

// FIN UN NUEVO CRUD //

// FIN solo para el usuario

// Solo para el ROLE ADMIN

router.get('/registro', isLoggedIn, (req, res) => {
    res.render('registro', { user: req.user, message: req.flash('signupMessage') });
});

// FIN solo para ROLE ADMIN

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

// Manejo de logn y registro

router.post('/registro', passport.authenticate('local-signup', {
    failureRedirect: '/login',
    failureFlash: true,
}), function(req, res) {
    res.redirect('/perfil?username=' + req.user.local.username);
});

router.post('/login', passport.authenticate('local-login', {
    failureRedirect: '/login',
    failureFlash: true,
}), function(req, res) {
    res.redirect('/perfil?username=' + req.user.local.username);
});



module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}