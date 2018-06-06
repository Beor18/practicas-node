const express = require('express');
const passport = require('passport');
const router = express.Router();
const Productos = require('../models/producto');

const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, './public/uploads');
    },
    filename: function(req, file, callback) {
        callback(null, file.fieldname + '-' + file.originalname.replace(path.extname(file.originalname), '_') + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });


router.get('/', (req, res, next) => {
    res.render('login', { message: req.flash('loginMessaje') });
});

// Solo para el usuario


router.get('/perfil', isLoggedIn, (req, res) => {
    res.render('perfil.ejs', {
        user: req.user
    });
});

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

router.get('/listar-producto', isLoggedIn, async(req, res, next) => {
    const productos = await Productos.find();
    res.json(productos);

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

router.get('/editar/:id', isLoggedIn, async(req, res, next) => {
    const { id } = req.params;
    const person = await Productos.findById(req.params.id);
    res.render('editar.ejs', {
        user: req.user,
        person
    });

});

router.post('/editar/:id', isLoggedIn, async(req, res, next) => {
    const { id } = req.params;
    await Productos.update({ _id: id }, req.body);
    res.redirect('/nuevo/1');
});

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

router.get('/registro', (req, res) => {
    res.render('registro', { message: req.flash('signupMessage') });
});

// FIN solo para ROLE ADMIN

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

// Manejo de logn y registro

router.post('/registro', upload.single('userPhoto'), passport.authenticate('local-signup', {
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