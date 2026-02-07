import prismaClient from "../Prisma/PrismaClient";
import {hash} from "bcryptjs"

interface CadastrarUsuario {
    nome: string,
    email: string,
    senha: string

}

interface AtualizarrUsuario {
    id: string,
    nome: string,
    email: string,
    senha: string

}

interface DeletarUsuario {
    id: string
}




class UsuarioServices {
    async cadastrarUsuario({nome,email,senha}: CadastrarUsuario){
        //emailExiste = faz uma consunta no bando de dados se já existe na base de dados
        //OR = Não dizer qual está cadastrado e uma boa pratica
        const emailExiste = await prismaClient.usuario.findFirst({
            where:{
                OR:[
                    {
                        email:email
                    },
                    {
                        senha:senha
                    }
                ]
            }
        })

        if(emailExiste){
            throw new Error("Email ou Senha já está cadastrado")
        }

        //senhaCrypte =  Seria a Cryptografia do senha com uma hash
        // 8 - 10 é um numero padrão, pela quantiade de vezes que ele vai criptgrofar
        const senhaCrypte = await hash(senha,10)

        await prismaClient.usuario.create({

            data:{
                nome:nome,
                email:email,
                senha:senhaCrypte
            }
        })

        return ({dados:"Cadastro Efetuado com Sucesso"})
    }

    async visualizarUsuario(){
        const resposta = await prismaClient.usuario.findMany({
            select:{
                id:true,
                nome:true,
                email:true,
                senha:true
            }
        })
        return resposta
    }

    async AlterarUsuario({id, nome, email, senha}: AtualizarrUsuario){
        await prismaClient.usuario.update({
            where:{
                id:id
            },
            data:{
                nome:nome,
                email:email,
                senha:senha

            }

        })

        return ({dados:"Usuario Alterado com Sucesso"})
    }

    async DeletarUsuario({id}: DeletarUsuario){
        await prismaClient.usuario.delete({
            where:{
                id:id
            }

        })

        return ({dados:"Usuario Deletado com Sucesso!"})
    }

}


export {UsuarioServices}