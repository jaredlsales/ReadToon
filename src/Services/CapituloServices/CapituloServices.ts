import prismaClient from "../../Prisma/PrismaClient";

interface Capitulo {
    numero: string,
    titulo: string,
    arquivo_url: string,
    idManhuwa: string
}

class CapituloServices {
    async capituloServices ({numero,titulo,arquivo_url,idManhuwa}:Capitulo) {
        await prismaClient.capitulo.create({
            data:{
                numero:numero,
                titulo:titulo,
                arquivo_url:arquivo_url,
                idManhuwa:idManhuwa
            }
        })

        return ({dados:"Cadastro Efetuado com sucesso"})
    }

    async visualizarCapitulo (){
        const resposta =  await prismaClient.capitulo.findMany({
            select:{
                id: true,
                numero: true,
                titulo: true,
                arquivo_url: true,
                data_alteracao: true
            }
        })

        return resposta
        
    }
}


export {CapituloServices}