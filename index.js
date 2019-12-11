const express = require("express")
const helmet = require("helmet")
const logger = require("./middleware/logger")
const userRouter = require("./users/userRouter")
const server = express()

server.use(express.json())

server.use(helmet())
server.use(logger())
server.use("/", userRouter)


// server.get("/", (req, res) => {
//     // console.log("ip:", req.ip)
//     res.send("<h2>Project Node 3</h3>")
// })

server.listen(4000, () => {
  console.log("Server Running on http://localhost:4000")
})