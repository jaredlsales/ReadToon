import {Request, Response } from "express"
import {UsuarioServices} from "../../Services/UsuarioServices/UsuarioServices"

class UsuarioControllers {
    async usuarioControllers (req: Request, res: Response) {
        const {nome, email, senha, idCadastro} = req.body
        const enviarDados = new UsuarioServices()
        const resposta = await enviarDados.usuarioServices({
            nome,
            email,
            senha,
            idCadastro
        })

        return res.json(resposta)
        
    }

    async visualizarUsuario (req:Request, res:Response){
        const enviarDados = new UsuarioServices()
        const resposta =  await enviarDados.visualizarUsuario()
        return res.json(resposta)
    }
}


export {UsuarioControllers}