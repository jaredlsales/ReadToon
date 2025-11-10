import { Request, Response } from "express"
import {ManhuwaServices } from "../../Services/ManhuwaServices/ManhuwaServices"

class ManhuwaControllers {
    async manhuwaControllers (req:Request, res:Response){
        const {titulo, autor, descricao, capa_url} =req.body
        const enviarDados = new ManhuwaServices()
        const resposta = await enviarDados.manhuwaServices({
            titulo,
            autor,
            descricao,
            capa_url
        })

        return res.json(resposta)
    }
}


export {ManhuwaControllers}