import { connectDb } from "./db/index.db.js";
import {app} from "./app.js"
import dotenv from "dotenv"

dotenv.config({
    path: "./.env"
})

connectDb()
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log("Server is listening on port :: ", process.env.PORT);
    })
})
.catch((err) => {
    console.log(err);
})
