const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let productoSchema = new Schema({
    titulo: { type: String },
    autor: { type: String },
    descripcion: { type: String },
    updated_date: { type: Date, default: Date.now }
});
//const Productos = mongoose.model('Productos', productoSchema);
module.exports = mongoose.model('Productos', productoSchema);