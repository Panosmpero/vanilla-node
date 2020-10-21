const Product = require("../models/productModel");
const { getPostData } = require("../utils");

// gets all products
// GET /api/products
async function getProducts(req, res) {
  try {
    // just like mongoose
    const products = await Product.findAll();

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(products));
  } catch (error) {
    console.log(error);
  }
}

// gets single product
// GET /api/products/:id
async function getProduct(req, res, id) {
  try {
    // just like mongoose
    const product = await Product.findById(id);

    if (!product) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Product not found." }));
      return;
    }

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(product));
  } catch (error) {
    console.log(error);
  }
}

// create a product
// POST /api/products
async function createProduct(req, res) {
  // get body date
  try {
    // req.body.title - etc...
    const body = await getPostData(req)

    const { title, description, price } = JSON.parse(body)

    const product = {
      title,
      description,
      price
    }

    const newProduct = await Product.create(product)

    res.writeHead(201, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(newProduct))

    
  } catch (error) {
    console.log(error);
  }
}

// update a product
// PUT /api/products/:id
async function updateProduct(req, res, id) {
  // get body date
  try {
    const product = await Product.findById(id)

    if (!product) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Product not updated." }));
      return;
    }

    const body = await getPostData(req)

    const { title, description, price } = JSON.parse(body)

    const productData = {
      title: title || product.title,
      description: description || product.description,
      price: price || product.price
    }

    const updProduct = await Product.update(id, productData)

    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(updProduct))

    
  } catch (error) {
    console.log(error);
  }
}


module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct
};
