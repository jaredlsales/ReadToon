import { Request, Response } from "express";
import {CapituloServices} from "../Services/CapituloServices"

class CapituloControllers {
    async CadastrarCapitulos(req:Request, res:Response){
        const {numero, capitulo_url_1, idManhwa} = req.body
        const enviarDados =  new CapituloServices()
        const resposta = await enviarDados.CadastrarCapitulos({
            numero,
            capitulo_url_1,
            idManhwa
        })
        
        return res.json(resposta)
    }
}

export {CapituloControllers}