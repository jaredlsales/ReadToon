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

    async VisualizarManhwa(req:Request, res:Response){
        const enviarDados =  new ManhwaServices()
        const resposta =  await enviarDados.VisualizarManhwa()
        return res.json(resposta)
    }

    async AlterarManhwa(req:Request, res:Response){
        const {id, titulo,descricao,autor,genero,capa_url} = req.body
        const enviarDados =  new ManhwaServices()
        const respota =  await enviarDados.AlterarManhwa({
            id,
            titulo,
            descricao,
            autor,
            genero,
            capa_url
        })

        return res.json(respota)
    }
}

export {ManhwaControllers}