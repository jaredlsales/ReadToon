import { Request, Response } from "express"
import {PerfilServices} from "../Services/PerfilServices"

class PerfilControllers {
    async AtualizarPerfil(req:Request, res:Response){
        const {foto_url, preferencias, idUsuario } = req.body
        const enviarDados = new PerfilServices()
        const resposta =  await enviarDados.AtualizarPerfil({
            foto_url,
            preferencias,
            idUsuario
        })

        return res.json(resposta)
    }

    async VisualizarPerfil(req:Request, res:Response){
        const enviarDados = new PerfilServices()
        const resposta = await enviarDados.VisualizarPerfil()
        return res.json(resposta)
    }
}



export {PerfilControllers}