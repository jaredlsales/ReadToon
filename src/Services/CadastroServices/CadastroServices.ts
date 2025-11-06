import prismaClient from "../../Prisma/PrismaClient"

interface CadastroClientes {
    nome: string,
    email: string,
    senha: string
}

class CadastroServices {
    async cadastroClientes ({nome, email, senha}:CadastroClientes) {
        await prismaClient.cadastro.create({
            data: {
                nome:nome,
                email:email,
                senha:senha
            }
        })

        return ({dados:"Cadastro Efetuado com sucesso"})

    }
}

export {CadastroServices}