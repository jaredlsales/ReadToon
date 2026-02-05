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
}

export {UsuarioControllers}