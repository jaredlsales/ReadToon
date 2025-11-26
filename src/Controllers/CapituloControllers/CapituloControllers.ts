import { Request, Response } from "express"
import {CapituloServices} from "../../Services/CapituloServices/CapituloServices"

class CapituloControllers {
    async capituloControllers (req: Request, res:Response) {
        const {numero, titulo, arquivo_url, idManhuwa} = req.body
        const enviarDados = new CapituloServices()
        const resposta = await enviarDados.capituloServices({
            numero,
            titulo,
            arquivo_url,
            idManhuwa
        })

       return res.json(resposta)
    }

    async visualizarCapituo (req:Request, res:Response){
        const enviarDados = new CapituloServices()
        const resposta = await enviarDados.visualizarCapitulo()
        return res.json(resposta)
    }
}



export {CapituloControllers}