import express from "express"
import cors from "cors"
import path from "path"
import mongoose from "mongoose"
import dotenv from "dotenv"
import anime from "./routes/anime.js"
import user from "./routes/user.js"
dotenv.config()


const app = express()
app.use(express.json())
app.use(cors())
const PORT = process.env.PORT || 5000
const HOST = process.env.HOST || 'localhost'
const MONGO_DB_URL = process.env.MONGO_DB_URL

app.get('/api', (req, res) => {
    res.status(200).json({
        message: 'Api [mixanime]'
    })
})

app.use('/api/anime', anime)
app.use('/api/user', user)

const __dirname = path.resolve()
app.use(express.static(path.join(__dirname, "/frontend/dist")))
app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname, "/frontend/dist/index.html"))
)

mongoose
    .connect(MONGO_DB_URL)
    .then(() => {
        console.log("DB Connected")
        app.listen(PORT, () => console.log(`visit http://${HOST}:${PORT}`))
    })
    .catch((e) => console.log("db NOT connected", e))
