import prismaClient from "../../Prisma/PrismaClient"

interface Usuario {
    nome: string,
    email: string,
    senha: string,
    idCadastro: string
}

class UsuarioServices {
    async usuarioServices ({nome,email,senha,idCadastro}: Usuario) {
        await prismaClient.usuario.create({
            data: {
                nome:nome,
                email:email,
                senha:senha,
                idCadastro:idCadastro
            }
        })

        return({dados:"Cadastro feito com sucesso"})
    }

    async visualizarUsuario (){
        const resposta = await prismaClient.usuario.findMany({
            select:{
                id: true,
                nome: true,
                email: true,
                data_criacao: true
            }
        })

        return resposta
        
    }
}


export { UsuarioServices }