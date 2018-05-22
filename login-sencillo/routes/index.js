const express = require('express');
const passport = require('passport');
const router = express.Router();
const path = require('path');

const fileUpload = require('express-fileupload');
router.use(fileUpload());


router.get('/', (req, res, next) => {
    res.render('login', { message: req.flash('loginMessaje') });
});

// Solo para el usuario


router.get('/perfil', isLoggedIn, (req, res) => {
    res.render('perfil.ejs', { user: req.user });
});

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