import prismaClient from "../Prisma/PrismaClient";

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
}


export {UsuarioServices}