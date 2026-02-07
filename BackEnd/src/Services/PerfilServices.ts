import prismaClient from "../Prisma/PrismaClient";

interface Perfil {
    foto_url: string,
    preferencias: string,
    idUsuario: string
}

interface AlterarPerfil {
    id: string,
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


    async VisualizarPerfil(){
        const resposta = await prismaClient.perfil.findMany({
            select:{
                id: true,
                idUsuario:true,
                foto_url:true,
                preferencias: true,
                data_criacao: true
            }

        })

        return resposta
        
    }

    async AlterarPerfil({id, idUsuario, foto_url, preferencias}: AlterarPerfil){
        await prismaClient.perfil.update({
            where:{
                id:id
            },
            data:{
                idUsuario:idUsuario,
                foto_url:foto_url,
                preferencias:preferencias
                
            }
        })

        return ({dados:"Perfil Alterado com Sucesso"})
    }
}

export {PerfilServices}