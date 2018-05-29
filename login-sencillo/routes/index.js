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

// // BOLUDECES
// router.get('/dsdsfsd', (req, res) => {
//     res.writeHead(200, { 'content-type': 'text/plain' });
//     res.end('Hola Mundo');
// });

// router.get('/producto/dsdsfsd', (req, res) => {
//     res.writeHead(200, { 'content-type': 'text/plain' });
//     res.end('Hola Mundo');
// });

// // FIN BOLUDECES

// Solo para el usuario


router.get('/perfil', isLoggedIn, (req, res) => {
    Productos.count(function(err, person) {
        //if (err) return next(err);
        res.render('perfil.ejs', {
            user: req.user,
            person
        });
    });
});

// Un nuevo CRUD //
/////////////////////////////////
///// este bloque /nuevo no se utiliza más
// router.get('/nuevo', isLoggedIn, (req, res) => {
//     Productos.find(function(err, person) {
//         //if (err) return next(err);
//         res.render('nuevo.ejs', {
//             user: req.user,
//             person
//         });
//     });
// });

router.get('/nuevo/:page', isLoggedIn, (req, res, next) => {
    let perPage = 9;
    let page = req.params.page || 1;

    Productos
        .find({})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec((err, person) => {
            Productos.count((err, count) => {
                if (err) return next(err);
                res.render('paginacion/paginacion.ejs', {
                    person,
                    user: req.user,
                    current: page,
                    pages: Math.ceil(count / perPage)
                });
            });
        });
});

// Se lista producto en formato JSON

router.get('/listar-producto', isLoggedIn, (req, res, next) => {
    Productos.find(function(err, products) {
        if (err) return next(err);
        res.json(products)

    });
    //res.render('nuevo.ejs', { user: req.user, producto: req.productos });
});

// SE AGREGA NUEVO PRODUCTO

router.post('/nuevo/1', function(req, res) {
    let body = req.body

    let producto = new Productos({
        titulo: body.titulo,
        autor: body.autor,
        descripcion: body.descripcion
    })

    producto.save(() => {
        res.redirect('/nuevo/1');
    });
});

// VER PRODUCTO
router.get('/producto/:id', isLoggedIn, (req, res, next) => {
    //let o_id = req.params.id;
    //let titulo = req.params.titulo;

    Productos.findById(req.params.id, function(err, person) {
        //if (err) return next(err);
        res.render('producto.ejs', {
            user: req.user,
            person
        });
    });

});
// FIN VER PRODUCTO

// router.put('/editar/:id', function(req, res) {

//     Productos.findByIdAndUpdate(req.params.id, { new: true }, (err, person) => {

//         if (err) {
//             console.log(err);
//             res.redirect('/perfil');
//         } else {
//             res.redirect('/nuevo', person);
//         }

//     });
// });

// ELIMINAR PRODUCTO

router.get('/delete/:id', isLoggedIn, function(req, res) {
    Productos.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            return res.send(err);
        } else {
            res.redirect('/nuevo/1');
        }
    });
});

// FIN ELIMINAR PRODUCTO

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
    failureRedirect: '/',
    failureFlash: true,
}), function(req, res) {
    res.redirect('/perfil?username=' + req.user.local.username);
});

router.post('/login', passport.authenticate('local-login', {
    failureRedirect: '/',
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