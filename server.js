const http = require("http");
const { getProducts, getProduct, createProduct } = require("./controllers/productsController");

const server = http.createServer((req, res) => {
  // console.log("test")
  // res.statusCode = 200
  // res.setHeader("Content-Type", "text/html")
  // res.write("<h1>Hello World</h1>")
  // res.end()

  // specify conditionals on method and request url
  if (req.url === "/api/products" && req.method === "GET") {
    getProducts(req, res);
  } else if (req.url.match(/\/api\/products\/([0-9]+)/) && req.method === "GET") {
    // req.url.match instead of express' req.params.id
    const id = req.url.split("/")[3]
    getProduct(req, res, id)
  } else if (req.url === "/api/products" && req.method === "POST") {
    createProduct(req, res)
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found." }));
  }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
