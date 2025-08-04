const mongoose = require('mongoose');

const ProductoSchema = new mongoose.Schema({
  codigo: { type: Number, required: true, unique: true },
  nombre: { type: String, required: true },
  precio: { type: Number, required: true },
  categoria: [{ type: String }]
});

module.exports = mongoose.model('Producto', ProductoSchema);