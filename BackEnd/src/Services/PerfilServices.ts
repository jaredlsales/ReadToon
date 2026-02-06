import prismaClient from "../Prisma/PrismaClient";

interface Perfil {
    foto_url: string,
    preferencias: string,
    idUsuario: string
}

class PerfilServices {
    async AtualizarPerfil({foto_url,preferencias,idUsuario}: Perfil){
        await prismaClient.perfil.create({
            data:{
                foto_url,
                preferencias,
                idUsuario
            }
        })

        return ({dados:"Perfil Atualizado com sucesso"})
    }
}

export {PerfilServices}