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
        this.ultimoscuatro = [];

        let data = require('../data/data.json');

        if (data.hoy === this.hoy) {

            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimoscuatro = data.ultimoscuatro;

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

    atenderTicket(escritorio) {

        if (this.tickets.length === 0) {
            return 'no hay tickets';
        }

        let numeroTicket = this.tickets[0].numero;
        this.tickets.shift();

        let atenderTicket = new Ticket(numeroTicket, escritorio);

        /////////////////////////////////////////////////////////
        //
        // Agrego el ticket al inicio del arreglo - no al final
        //
        /////////////////////////////////////////////////////////
        // 
        // Aca me sale un error por consola 
        //
        // TypeError: Cannot read property 'unshift' of undefined
        //
        /////////////////////////////////////////////////////////

        this.ultimoscuatro.unshift(atenderTicket);

        /////////////////////////////////////////////////////////
        //
        // Verificar que solo halla 4 tickets en ese arreglo
        if (this.ultimoscuatro.length > 4) {
            this.ultimoscuatro.splice(-1, 1); // borra el ultimo elemento
        }

        //console.log('Ultimos 4 tickets');
        //console.log(this.ultimosCuatro);

        this.grabarArchivo(); // Guardamos en el archivo json o db

        return atenderTicket; // regreso el ticket que quiero atender

    }

    reiniciarConteo() {
        this.ultimo = 0;
        this.tickets = [];
        this.ultimoscuatro = [];

        console.log('se ha iniciado el sistema');
        this.grabarArchivo();
    }

    grabarArchivo() {
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimoscuatro: this.ultimoscuatro
        };

        let jsonDataString = JSON.stringify(jsonData);

        fs.writeFileSync('./server/data/data.json', jsonDataString);

        //console.log('se ha iniciado el sistema');
    }
}


module.exports = {
    TicketControl
}