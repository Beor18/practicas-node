const { io } = require('./app');
const Productos = require('./models/producto');

var usuarioContador = 0;
//var viable = Productos.watch();

io.on('connection', (client) => {

    usuarioContador++;
    io.emit('users.count', usuarioContador);

    var count = 1;
    var stream = Productos.find().stream().sort({ _id: 1 });
    //var viable = Productos.watch();
    Productos.find({ destacados: "destacados" }, { '_id': 0 }, (err, data) => {
        if (err) throw err;

        if (data) {
            setTimeout(function() {
                io.sockets.emit('items', data);
            }, 2000);
        }
    }).limit(4).sort({ _id: -1 });

    client.on('change', function(change) {
        console.log(change);
        //find('productos').limit(2).sort({ _id: -1 })
        Productos.find({ destacados: "destacados" }, (err, data) => {
            if (err) throw err;

            if (data) {
                // RESEND ALL USERS
                setTimeout(function() {
                    io.sockets.emit('items', data);
                }, 2000);
            }
        }).limit(4).sort({ _id: -1 });
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