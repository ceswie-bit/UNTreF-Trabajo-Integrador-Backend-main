// app.js
const express = require('express');
const connectDB = require('./config/database');
// ...existing code...
const productRoutes = require('./routes/productRoutes');
// ...existing code...

// Crear el servidor
const app = express();

// Conectar a la base de datos
connectDB();

// Habilitar express.json para leer datos del body
app.use(express.json());

// Montar las rutas de productos
app.use('/api/productos', productRoutes);

// Definir el puerto y arrancar el proyecto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});