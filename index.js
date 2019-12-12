const express = require("express")
const helmet = require("helmet")
const logger = require("./middleware/logger")
const userRouter = require("./users/userRouter")
const server = express()
const app = express()
const host = process.env.HOST || "0.0.0.0"
const port = process.env.PORT || 8080

app.use(express.json())

app.use(helmet())
app.use(logger())
app.use("/", userRouter)


// server.get("/", (req, res) => {
//     // console.log("ip:", req.ip)
//     res.send("<h2>Project Node 3</h3>")
// })

// server.listen(4000, () => {
//   console.log("Server Running on http://localhost:4000")
// })

app.listen(port, host, () => {
	console.log(`Running at http://${host}:${port}`)
})