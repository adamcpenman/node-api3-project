const express = require("express")

const server = express()

server.use(express.json())

server.get("/", (req, res) => {
    // console.log("ip:", req.ip)
    res.send("<h2>Project Node 3</h3>")
})

server.listen(4000, () => {
  console.log("Server Running on http://localhost:4000")
})