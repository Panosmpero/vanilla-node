const fs = require("fs");
// import FileSystem

function writeDataToFile(filename, content) {
  fs.writeFileSync(filename, JSON.stringify(content), (err) => {
    if (err) {
      console.log(err)
    }
  })
}

function getPostData(req) {
  return new Promise((resolve, reject) => {
    try {
      let body = ""

      req.on("data", (chunk) => {
        body += chunk.toString()
      })

      req.on("end", () => {
        resolve(body)
      })
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = {
  writeDataToFile,
  getPostData
}