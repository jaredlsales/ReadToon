import { Request, Response } from "express";
import {CapituloServices} from "../Services/CapituloServices"

class CapituloControllers {
    async CadastrarCapitulos(req:Request, res:Response){
        const {numero, idManhwa} = req.body
        // 1. Mudança aqui: usamos req.files (plural)
        const files = req.files as Express.Multer.File[];
        if (!files || files.length === 0) {
            throw new Error ("Imagem com problemas")
        }else {
            // 2. Mudança aqui: Pegamos os nomes de todos os arquivos e juntamos
            // Isso gera uma string: "hash-img1.png,hash-img2.png..."
            const nomesImagens = files.map(file => file.filename).join(",");

            const enviarDados =  new CapituloServices()
            const resposta = await enviarDados.CadastrarCapitulos({
                numero,
                capitulo_url_1: nomesImagens, // Enviamos a string com todas as fotos
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