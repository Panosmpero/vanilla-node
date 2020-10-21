const products = require("../data/products.json");

function findAll() {
  return new Promise((resolve, reject) => {
    resolve(products);
  });
}

function findById(id) {
  return new Promise((resolve, reject) => {
    const product = products.find((prod) => prod.id === id);
    resolve(product);
  });
}

module.exports = {
  findAll,
  findById,
};
