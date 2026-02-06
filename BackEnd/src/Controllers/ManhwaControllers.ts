import {Request, Response} from "express"
import {ManhwaServices} from "../Services/ManhwaServices"

class ManhwaControllers {
    async CadastrarManhwa(req:Request, res:Response){
        const {titulo, descricao, autor, genero, capa_url} = req.body
        const enviarDados = new ManhwaServices()
        const resposta =  await enviarDados.CadastrarManhwa({
            titulo,
            descricao,
            autor,
            genero,
            capa_url
        })

        return res.json(resposta)
    }
}

export {ManhwaControllers}