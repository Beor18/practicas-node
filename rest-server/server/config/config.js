// Puerto

process.env.PORT = process.env.PORT || 3000;

// Entorno

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// Vencimiento Token
// 60 segundos
// 60 minutos
// 24 horas
// 30 dias

process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

// Semilla de autentificacion

process.env.SEMILLA = process.env.SEMILLA || 'seed-desarrollo';

///////////////////////////////////////////////////////////////
// Para heroku agregar variable de entorno llamado SEMILLA  ///
//
// heroku config:set SEMILLA="seed-desarrollo"    /////////////
//
///////////////////////////////////////////////////////////////

// Base de datos

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/comercio';
} else {
    urlDB = '';
}

process.env.URLDB = urlDB;


// Google Client ID

process.env.CLIENT_ID = process.env.CLIENT_ID || '937519696066-8mpchd93k21dausprqvj0hhit5hemhmf.apps.googleusercontent.com';