import { Request, Response } from "express"
import { PerfilServices } from "../Services/PerfilServices"

class PerfilControllers {
    async AtualizarPerfil(req: Request, res: Response) {
        const { foto_url, preferencias, idUsuario } = req.body
        const enviarDados = new PerfilServices()
        const resposta = await enviarDados.AtualizarPerfil({
            foto_url,
            preferencias,
            idUsuario
        })

        return res.json(resposta)
    }

    async VisualizarPerfil(req: Request, res: Response) {
        const enviarDados = new PerfilServices()
        const resposta = await enviarDados.VisualizarPerfil()
        return res.json(resposta)
    }

    //Alterecao realizado pra mudar de foto no Perfil
    async AlterarPerfil(req: Request, res: Response) {
        const { id,preferencias, idUsuario } = req.body
        // Verificamos se o Multer salvou um arquivo e pegamos o nome dele
        // Se não veio arquivo novo, foto_url será undefined e o Service não mudará a foto atual
        const foto_url = req.file ? req.file.filename : undefined;
        const enviarDados = new PerfilServices()
        const resposta = await enviarDados.AlterarPerfil({
            id,
            idUsuario,
            foto_url,
            preferencias
        })

        return res.json(resposta)
    }

    async DeletarPerfil(req: Request, res: Response) {
        const { id } = req.params
        const enviarDados = new PerfilServices()
        const resposta = await enviarDados.DeletarPerfil({
            id
        })

        return res.json(resposta)
    }
}



export { PerfilControllers }