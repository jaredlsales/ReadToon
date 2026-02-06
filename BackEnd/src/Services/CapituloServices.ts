import prismaClient from "../Prisma/PrismaClient";


interface Capitulos {
    numero: number,
    capitulo_url_1: string,
    idManhwa: string
}

class CapituloServices {
    async CadastrarCapitulos({numero,capitulo_url_1,idManhwa}: Capitulos){
        await prismaClient.capitulo.create({
            data:{
                numero:numero,
                capitulo_url_1:capitulo_url_1,
                idManhwa:idManhwa
            }
        })

        return ({dados:"Capitulo Cadastrado com Sucesso"})
    }
}

export {CapituloServices}