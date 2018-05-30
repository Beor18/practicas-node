const { io } = require('./app');
const Productos = require('./models/producto');

var usuarioContador = 0;
var viable = Productos.watch();

io.on('connection', (client) => {

    usuarioContador++;
    io.emit('users.count', usuarioContador);

    var count = 1;
    var stream = Productos.find().stream().sort({ _id: 1 });
    //var viable = Productos.watch();
 Productos.find({}, {'_id': 0}, (err, data) => {
            if (err) throw err;
    
            if (data) {
                client.emit('items', data);
            }
}).limit(2).sort({ _id: -1 });

    viable.on('change', function(change) {
        console.log(change);
        //find('productos').limit(2).sort({ _id: -1 })
        Productos.find({}, (err, data) => {
            if (err) throw err;

            if (data) {
                // RESEND ALL USERS
                io.sockets.emit('items', data);
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
