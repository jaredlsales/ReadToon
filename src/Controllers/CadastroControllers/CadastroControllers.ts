import { Request, Response } from "express"
import { CadastroServices } from "../../Services/CadastroServices/CadastroServices"

class CadastroControllers {
    async cadastroControllers(req: Request, res: Response){
        const {nome, email, senha} = req.body
        const enviarDados = new CadastroServices()
        const resposta = await enviarDados.cadastroClientes({
            nome,
            email,
            senha
        })

        return res.json(resposta)
        
    }
}


export {CadastroControllers}
