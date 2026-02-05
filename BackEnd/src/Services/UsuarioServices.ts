import prismaClient from "../Prisma/PrismaClient";

interface CadastrarUsuario {
    nome: string,
    email: string,
    senha: string

}

class UsuarioServices {
    async cadastrarUsuario({nome,email,senha}: CadastrarUsuario){
        await prismaClient.usuario.create({

            data:{
                nome:nome,
                email:email,
                senha:senha
            }
        })

        return ({dados:"Cadastro Efetuado com Sucesso"})
    }
}


export {UsuarioServices}