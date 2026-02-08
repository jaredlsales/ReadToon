import { Request, Response } from "express";
import {CapituloServices} from "../Services/CapituloServices"

class CapituloControllers {
    async CadastrarCapitulos(req:Request, res:Response){
        const {numero, capitulo_url_1, idManhwa} = req.body
        if(!req.file){
            throw new Error ("Imagem com problemas")
        }else {
            const {originalname, filename: capitulo_url_1} = req.file
            const enviarDados =  new CapituloServices()
            const resposta = await enviarDados.CadastrarCapitulos({
                numero,
                capitulo_url_1,
                idManhwa
            })
            
            return res.json(resposta)

            }
    }

    async VisualizarCapitulos(req:Request, res:Response){
        const enviarDados =  new CapituloServices()
        const resposta = await enviarDados.VisualizarCapitulos()
        return res.json(resposta)
    }

    async AlterarCapitulos(req:Request, res:Response){
        const {id,idManhwa, numero, capitulo_url_1} = req.body
        const enviarDados =  new CapituloServices()
        const resposta =  await enviarDados.AlterarCapitulos({
            id,
            idManhwa,
            capitulo_url_1,
            numero
        })

        return res.json(resposta)
    }

    async DeletarCapitulos(req:Request, res:Response){
        const {id} = req.params
        const enviarDados =  new CapituloServices()
        const resposta = await enviarDados.DeletarCapitulos({
            id
        })

        return res.json(resposta)
    }

    

}

export {CapituloControllers}