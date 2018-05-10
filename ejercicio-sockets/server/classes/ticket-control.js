const fs = require('fs');

// Se crea otra clase

class Ticket {
    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;

    }
}

class TicketControl {

    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];

        let data = require('../data/data.json');

        if (data.hoy === this.hoy) {

            this.ultimo = data.ultimo;
            this.tickets = data.tickets;

        } else {
            this.reiniciarConteo();
        }
    }

    siguiente() {
        this.ultimo += 1;
        let ticket = new Ticket(this.ultimo, null);

        this.tickets.push(ticket);

        this.grabarArchivo();

        return `Ticket ${ this.ultimo }`;

    }

    getUltimoTicket() {
        return `Ticket ${ this.ultimo }`;
    }

    reiniciarConteo() {
        this.ultimo = 0;
        this.tickets = [];

        console.log('se ha iniciado el sistema');
        this.grabarArchivo();
    }

    grabarArchivo() {
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets
        };

        let jsonDataString = JSON.stringify(jsonData);

        fs.writeFileSync('./server/data/data.json', jsonDataString);

        //console.log('se ha iniciado el sistema');
    }
}


module.exports = {
    TicketControl
}