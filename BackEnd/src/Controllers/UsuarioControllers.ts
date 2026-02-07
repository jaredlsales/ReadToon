import {Request, Response} from "express"
import { UsuarioServices } from "../Services/UsuarioServices"

class UsuarioControllers {
    async CadastrarUsuario(req:Request, res:Response){
        const {nome, email, senha} = req.body
        const enviarDados = new UsuarioServices()
        const resposta =  await enviarDados.cadastrarUsuario({
            nome,
            email,
            senha
        })

        return res.json(resposta)
    }

    async VisualizarUsuario(req:Request, res:Response){
        const enviarDados =  new UsuarioServices()
        const resposta =  await enviarDados.visualizarUsuario()
        return res.json(resposta)
    }


    async AlterarUsuario(req:Request, res:Response){
        const {id, nome, email, senha} = req.body
        const enviarDados = new UsuarioServices()
        const resposta =  await enviarDados.AlterarUsuario({
            id,
            nome,
            email,
            senha
        })

        return res.json(resposta)
    }

    async DeletarUsuario(req:Request, res:Response){
        const {id} = req.params
        const enviarDados = new UsuarioServices()
        const resposta =  await enviarDados.DeletarUsuario({
            id
        })

        return res.json(resposta)
    }

    
}

export {UsuarioControllers}