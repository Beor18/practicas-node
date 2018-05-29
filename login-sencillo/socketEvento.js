const { io } = require('./app');
const Productos = require('./models/producto');

var usuarioContador = 0;

io.on('connection', (client) => {

    usuarioContador++;
    io.emit('users.count', usuarioContador);

    var count = 1;
    var stream = Productos.find().stream();

    stream.on('data', function(productos) {
        io.sockets.emit('post.add', productos);
        io.sockets.emit('comment.count', {
            count: count++
        });
    });

    client.on('disconnect', function() {
        usuarioContador--;
        io.emit('users.count', usuarioContador);
    });

});