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
        const idUsuario = req.userID; // Pegando o ID do token logado
        const enviarDados = new PerfilServices();
        const resposta = await enviarDados.VisualizarPerfil(idUsuario);
        return res.json(resposta);
    }

    //Alterecao realizado pra mudar de foto no Perfil
    async AlterarPerfil(req: Request, res: Response) {
        const { id, preferencias, idUsuario } = req.body
        // Verificamos se o Multer salvou um arquivo e pegamos o nome dele
        // Se não veio arquivo novo, foto_url será undefined e o Service não mudará a foto atual
        // Verifique se o ID existe antes de mandar para o Service
        if (!id) {
            return res.status(400).json({ error: "ID do perfil é obrigatório" });
        }

        const foto_url = req.file ? req.file.filename : undefined;
        const enviarDados = new PerfilServices();

        try {
            const resposta = await enviarDados.AlterarPerfil({
                id,
                idUsuario,
                foto_url,
                preferencias
            });
            return res.json(resposta);
        } catch (err) {
            return res.status(400).json({ error: "Erro ao atualizar no Prisma" });
        }

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