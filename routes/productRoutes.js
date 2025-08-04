// /src/routes/productoRoutes.js
const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productController');

// --- CRUD Básico ---
router.get('/', productoController.getProductos);
router.get('/:codigo', productoController.getProductoPorCodigo);
router.post('/', productoController.crearProducto);
router.put('/:codigo', productoController.actualizarProducto);
router.delete('/:codigo', productoController.eliminarProducto);

// --- Endpoints Adicionales ---
router.get('/buscar', productoController.buscarProductos);
router.get('/categoria/:nombre', productoController.getProductosPorCategoria);
router.get('/precio/:min-:max', productoController.getProductosPorPrecio);
router.post('/masivo', productoController.crearProductosMasivo);

module.exports = router;