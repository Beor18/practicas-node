const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let destacado = {
    values: ['destacados', 'no_destacado'],
    message: '{VALUE} no es valido'
};

let provincia = {
    values: ["Buenos Aires", "Santa Fe", "Cordoba"],
    message: '{VALUE} no es una provincia valida'
};

let servicio = {
    values: ["WIFi", "TV Satelital", "Servicio a la habitacion", "DVD", "Estacionamientos individuales", "Señal para adultos"],
    message: '{VALUE} no es un servicio valido'
};

let productoSchema = new Schema({
    titulo: { type: String },
    autor: { type: String },
    descripcion: { type: String },
    fotoperfil: { type: String },
    fotos: { type: String, require: true },
    destacados: { type: String, enum: destacado },
    provincias: { type: String, enum: provincia },
    telefono: { type: String },
    tarifas: { type: String },
    servicios: { type: Array },
    iframe: { type: String },
    latitude: { type: String },
    longitude: { type: String },
    updated_date: { type: Date, default: Date.now }
});
//const Productos = mongoose.model('Productos', productoSchema);
module.exports = mongoose.model('Productos', productoSchema);