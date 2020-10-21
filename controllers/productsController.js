const Product = require("../models/productModel");

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

module.exports = {
  getProducts,
  getProduct
};
