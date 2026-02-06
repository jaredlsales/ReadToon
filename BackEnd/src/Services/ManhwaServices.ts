import prismaClient from "../Prisma/PrismaClient";

interface Manhwa {
    titulo: string,
    descricao: string,
    autor: string,
    genero: string,
    capa_url: string
}

class ManhwaServices {
    async CadastrarManhwa({titulo,descricao,autor,genero,capa_url}: Manhwa){
        await prismaClient.manhwa.create({
            data:{
                titulo:titulo,
                descricao:descricao,
                autor:autor,
                genero:genero,
                capa_url:capa_url
            }
        })

        return ({dados:"Manhwa Cadastrado com Sucesso"})
    }
}

export {ManhwaServices}