import { warnEnvConflicts } from "@prisma/client/runtime/library";
import prismaClient from "../Prisma/PrismaClient";
import {compare, hash} from "bcryptjs"
import { sign } from "jsonwebtoken";

interface CadastrarUsuario {
    nome: string,
    email: string,
    senha: string

}

interface LoginUsuario {
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

    async LoginUsuario({email,senha}: LoginUsuario){
        const emailExiste = await prismaClient.usuario.findFirst({
            where:{
                email:email
            }
        })

        if(!emailExiste){
            throw new Error ("Login Incorreto")
        }

        const senhaCrypte = await compare(senha,emailExiste.senha)
        //console.log(senhaCrypte)
        if(!senhaCrypte){
            throw new Error ("Email ou senha Incorreto")
         
        }

        const token = sign({
            id: emailExiste.id,
            nome: emailExiste.nome,
            email: emailExiste.email
        },
        //Pegando variavel de ambiente -- subkect = sub = id (vai comparar o id do front com o back)
            process.env.JWT_SECRET,
            {
                subject: emailExiste.id,
                expiresIn: "12h"
            }
        )
        return {
            id: emailExiste.id,
            nome:emailExiste.nome,
            email:emailExiste.email,
            token: token
        }
            
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