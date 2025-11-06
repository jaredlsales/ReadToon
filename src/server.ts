import express, {Request, Response, NextFunction} from "express"
import "express-async-errors"
import cors from "cors"
import router from "./routes"


// Configuração básica do servidor Express com suporte a JSON, CORS e rotas definidas externamente
const app = express()
app.use(express.json())
app.use(cors())
app.use(router)


// Middleware de tratamento de erros: retorna 400 para erros conhecidos e 500 para falhas internas inesperadas
app.use((err: Error, req: Request, res: Response, next: NextFunction)=>{
    if (err instanceof Error){
        return res.status(400).json({
            error:err.message
        })
    }


    return res.status(500).json({
        status: "Erro",
        message: "Erro interno do Servidor"
    })

})


// Inicia o servidor Express e escuta na porta 3333, exibindo uma mensagem no console quando estiver pronto
app.listen(3333, () => console.log("Servidor On-line na porta 3333"))




