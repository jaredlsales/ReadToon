import express, {Request, Response, NextFunction} from "express"
import "express-async-errors"
import cors from "cors"
import path from "path"
import routes from "./routes"
import { error } from "console"

const app = express()
app.use(express.json())
app.use(cors())
app.use(routes)


// Melhorando a saida do Erro (deixando mais humanizado)
// Erro de requisição 400 do metodo HTTP (Bad Request)

app.use((err:Error, req:Request, res:Response, next:NextFunction ) => {
    if (err instanceof Error){
        return res.status(400).json({
            error: err.message
        })
    }

    // Erro 500 metodo HTTP (erro interno no servidor)
    return res.status(500).json({
        status: "Erro",
        message: "Erro interno do Servidor"
    })
})


// Servidor 
app.listen(3333, () => console.log("Servidor on-line na porta 3333"))
