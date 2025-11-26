import prismaClient from "../../Prisma/PrismaClient"

interface Manhuwa {
    titulo: string,
    autor: string,
    descricao: string,
    capa_url: string
}

class ManhuwaServices {
    async manhuwaServices ({titulo,autor,descricao,capa_url}: Manhuwa) {
        await prismaClient.manhuwa.create({
            data: {
            titulo:titulo,
            autor:autor,
            descricao:descricao,
            capa_url:capa_url
            }

        })

        return ({dados:"Cadastro Efetuado com sucesso"})
    }

    async visualizarManhuwa (){
        const resposta = await prismaClient.manhuwa.findMany({
            select:{
                id: true,
                titulo: true,
                autor: true,
                descricao: true,
                capa_url: true
            }
        })
        return resposta
    }
}


export {ManhuwaServices}