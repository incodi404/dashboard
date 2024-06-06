import express from "express"
import cors from "cors"

const app = express()

app.use(cors({
    origin: "*",
}))
app.use(express.json({limit: "20kb"}))
app.use(express.urlencoded({limit: "20kb", extended: true}))

import { router } from "./routes/dashboard.routes.js"

app.use("/api/v1/dashboard", router)

export {app}