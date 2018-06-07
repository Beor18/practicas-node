//Iniciamos servidor express

const express = require('express');
const mcache = require('memory-cache');

const app = express();

// Servidor escuchando en puerto 3000
const puerto = process.env.PORT || 3000;

// Middleware de caché

const cache = (duration) => {
    return (req, res, next) => {
        let key = '__express__' + req.originalUrl || req.url
        let cachedBody = mcache.get(key)
        if (cachedBody) {
            res.send(cachedBody)
            return
        } else {
            res.sendResponse = res.send
            res.send = (body) => {
                mcache.put(key, body, duration * 1000);
                res.sendResponse(body)
            }
            next()
        }
    }
}

app.get('/', cache(10), (req, res) => {
    setTimeout(() => {
            res.send({ titulo: 'Hola esto es prueba de cache', mensaje: 'La fecha no se actualiza demasiado rapido cada vez que se actualiza seguido', date: new Date() })
        }, 5000) // Simulamos una solicitud de procesamiento lento en 5 segundos
})


app.listen(puerto, () => {
    console.log('Servidor puerto 3000');
});
