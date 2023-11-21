import express from "express";
import routes from "./routes.js"

const app = express()
const port = 3000
app.use(express.json())
app.use(routes)

// error handling
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    err.message = err.message || "Internal Server Error"
    res.status(err.statusCode).json({
        message: err.message
    })
})

app.listen(port, () => console.log(`Server is running on port ${port}`))