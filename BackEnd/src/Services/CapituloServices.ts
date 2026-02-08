import prismaClient from "../Prisma/PrismaClient";


interface Capitulos {
    numero: number,
    capitulo_url_1: string,
    idManhwa: string
}

interface AlterarCapitulos {
    id: string,
    numero: number,
    capitulo_url_1: string,
    idManhwa: string
}

interface DeletarCapitulos {
    id: string
}

class CapituloServices {
    async CadastrarCapitulos({numero,capitulo_url_1,idManhwa}: Capitulos){
        await prismaClient.capitulo.create({
            data:{
                // Converte a string que vem do multer para número inteiro
                numero: Number(numero),
                capitulo_url_1:capitulo_url_1,
                idManhwa:idManhwa
            }
        })

        return ({dados:"Capitulo Cadastrado com Sucesso"})
    }

    async VisualizarCapitulos(){
        const resposta =  await prismaClient.capitulo.findMany({
            select:{
                id:true,
                idManhwa:true,
                capitulo_url_1:true,
                numero:true,

            }
        })

        return resposta
    }

    async AlterarCapitulos({id, idManhwa,capitulo_url_1, numero}: AlterarCapitulos){
        await prismaClient.capitulo.update({
            where:{
                id:id
            },
            data:{
                idManhwa:idManhwa,
                capitulo_url_1:capitulo_url_1,
                // Converte a string que vem do multer para número inteiro
                numero: Number(numero)
            }
        })

        return ({dados:"Capitulo Atualizado com Sucesso!"})
    }

    async DeletarCapitulos({id}: DeletarCapitulos){
        await prismaClient.capitulo.delete({
            where:{
                id:id
            }
        })

        return ({dados:"Capitulo Deletado com Sucesso!"})
    }
}

export {CapituloServices}