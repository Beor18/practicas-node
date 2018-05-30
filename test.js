'use strict'
// Prueba 
const autocannon = require('autocannon')

autocannon({
    url: 'http://localhost:3000',
    connections: 100, //Conexiones
    pipelining: 1,
    duration: 10
}, console.log)