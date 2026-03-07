import prismaClient from "../Prisma/PrismaClient";

interface Perfil {
    foto_url: string,
    preferencias: string,
    idUsuario: string
}

//Alterecao realizado pra mudar de foto no Perfil
interface AlterarPerfil {
    id: string;
    foto_url?: string; // O '?' torna o campo opcional (aceita string ou undefined)
    preferencias: string;
    idUsuario: string;
}

interface DeletarPerfil {
    id: string
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

    //Alterecao realizado pra mudar de foto no Perfil
    async AlterarPerfil({id, idUsuario, foto_url, preferencias}: AlterarPerfil){
        await prismaClient.perfil.update({
            where:{
                id:id
            },
            data:{
                idUsuario:idUsuario,
                // Lógica inteligente: Só adiciona foto_url ao objeto 'data' se ela existir
                ...(foto_url && { foto_url: foto_url }),
                preferencias:preferencias
                
            }
        })

        return ({dados:"Perfil Alterado com Sucesso"})
    }

    async DeletarPerfil({id}: DeletarPerfil){
        await prismaClient.perfil.delete({
            where:{
                id:id
            }
        })

        return ({dados:"Perfil Deletado com Sucesso"})
    }
}

export {PerfilServices}