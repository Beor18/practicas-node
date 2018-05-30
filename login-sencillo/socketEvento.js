const { io } = require('./app');
const Productos = require('./models/producto');

var usuarioContador = 0;

io.on('connection', (client) => {

    usuarioContador++;
    io.emit('users.count', usuarioContador);

    var count = 1;
    var stream = Productos.find().stream().sort({ _id: 1 });
    var viable = Productos.watch();

    viable.on('data', function(productos) {
        //console.log(productos);
        //find('productos').limit(2).sort({ _id: -1 })
        Productos.find({}, (err, data) => {
            if (err) throw err;

            if (data) {
                // RESEND ALL USERS
                io.sockets.emit('post-add', data);
            }
        });
        //io.sockets.emit('post-add', productos);
    });

    stream.on('data', function(productos) {
        //io.sockets.emit('post.add', productos);
        io.sockets.emit('comment.count', {
            count: count++
        });
    });

    client.on('disconnect', function() {
        usuarioContador--;
        io.emit('users.count', usuarioContador);
    });

});