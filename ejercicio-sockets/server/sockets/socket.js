const { io } = require('../server');

const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    client.on('siguienteTicket', (data, callback) => {

        let siguiente = ticketControl.siguiente();
        console.log(siguiente);
        callback(siguiente);
    });

    // Emitir estado actual getUltimoTicket()

    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket()
    });

    // Atender ticket mediante socket

    client.on('atenderTicket', (data, callback) => {
        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'El escritorio es necesario'
            });
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);

        callback(atenderTicket);

        // actualizar/notificar cambios en los ultimos 4 tickets


    });

});