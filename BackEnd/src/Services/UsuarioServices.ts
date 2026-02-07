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
}


export {UsuarioServices}