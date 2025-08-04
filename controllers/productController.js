const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/producto.json');

// Obtener todos los productos
exports.getProductos = (req, res) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Hubo un error al leer los productos');
    const productos = JSON.parse(data || '[]');
    res.status(200).json(productos);
  });
};

// Obtener un producto por su código
exports.getProductoPorCodigo = (req, res) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Hubo un error al leer los productos');
    const productos = JSON.parse(data || '[]');
    const producto = productos.find(p => p.codigo == req.params.codigo);
    if (!producto) return res.status(404).send('Producto no encontrado');
    res.status(200).json(producto);
  });
};

// Crear un nuevo producto
exports.crearProducto = (req, res) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Hubo un error al leer los productos');
    let productos = JSON.parse(data || '[]');
    const nuevoProducto = req.body;
    if (productos.find(p => p.codigo == nuevoProducto.codigo)) {
      return res.status(400).send('Ya existe un producto con ese código');
    }
    productos.push(nuevoProducto);
    fs.writeFile(filePath, JSON.stringify(productos, null, 2), err => {
      if (err) return res.status(500).send('Hubo un error al guardar el producto');
      res.status(201).json(nuevoProducto);
    });
  });
};

// Actualizar un producto
exports.actualizarProducto = (req, res) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Hubo un error al leer los productos');
    let productos = JSON.parse(data || '[]');
    const idx = productos.findIndex(p => p.codigo == req.params.codigo);
    if (idx === -1) return res.status(404).send('Producto no encontrado');
    productos[idx] = { ...productos[idx], ...req.body };
    fs.writeFile(filePath, JSON.stringify(productos, null, 2), err => {
      if (err) return res.status(500).send('Hubo un error al actualizar el producto');
      res.status(200).json(productos[idx]);
    });
  });
};

// Eliminar un producto
exports.eliminarProducto = (req, res) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Hubo un error al leer los productos');
    let productos = JSON.parse(data || '[]');
    const idx = productos.findIndex(p => p.codigo == req.params.codigo);
    if (idx === -1) return res.status(404).send('Producto no encontrado');
    const eliminado = productos.splice(idx, 1)[0];
    fs.writeFile(filePath, JSON.stringify(productos, null, 2), err => {
      if (err) return res.status(500).send('Hubo un error al eliminar el producto');
      res.status(200).json(eliminado);
    });
  });
};

// Buscar productos por término
exports.buscarProductos = (req, res) => {
  const q = (req.query.q || '').toLowerCase();
  console.log('Buscando:', q);
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Hubo un error al leer los productos');
    const productos = JSON.parse(data || '[]');
    console.log('Productos:', productos);
    const resultado = productos.filter(p => p.nombre.toLowerCase().includes(q));
    console.log('Resultado:', resultado);
    res.status(200).json(resultado);
  });
};

// Filtrar productos por categoría
exports.getProductosPorCategoria = (req, res) => {
  const categoria = (req.params.nombre || '').toLowerCase();
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Hubo un error al leer los productos');
    const productos = JSON.parse(data || '[]');
    const resultado = productos.filter(p => p.categoria.map(c => c.toLowerCase()).includes(categoria));
    res.status(200).json(resultado);
  });
};

// Filtrar productos por rango de precio
exports.getProductosPorPrecio = (req, res) => {
  const min = Number(req.params.min);
  const max = Number(req.params.max);
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Hubo un error al leer los productos');
    const productos = JSON.parse(data || '[]');
    const resultado = productos.filter(p => p.precio >= min && p.precio <= max);
    res.status(200).json(resultado);
  });
};

// Carga masiva de productos
exports.crearProductosMasivo = (req, res) => {
  const nuevosProductos = req.body;
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Hubo un error al leer los productos');
    let productos = JSON.parse(data || '[]');
    nuevosProductos.forEach(nuevo => {
      if (!productos.find(p => p.codigo == nuevo.codigo)) {
        productos.push(nuevo);
      }
    });
    fs.writeFile(filePath, JSON.stringify(productos, null, 2), err => {
      if (err) return res.status(500).send('Hubo un error al guardar los productos');
      res.status(201).json(nuevosProductos);
    });
  });
};