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
    async AtualizarPerfil({ foto_url, preferencias, idUsuario }: Perfil) {
        await prismaClient.perfil.create({
            data: {
                foto_url,
                preferencias,
                idUsuario
            }
        })

        return ({ dados: "Perfil Atualizado com sucesso" })
    }


    async VisualizarPerfil(idUsuario: string) { // Receba o ID do usuário logado
        // Tenta encontrar o perfil do usuário
        let perfil = await prismaClient.perfil.findFirst({
            where: { idUsuario: idUsuario },
            include: { usuario: true }
        });

        // Se não existir perfil para este usuário, criamos um básico agora
        if (!perfil) {
            perfil = await prismaClient.perfil.create({
                data: {
                    idUsuario: idUsuario,
                    foto_url: "default-avatar.png", // Esse arquivo TEM que estar na pasta tmp"
                    preferencias: "" // Inicia vazio
                },
                include: { usuario: true }
            });
        }

        return perfil;
    }

    //Alterecao realizado pra mudar de foto no Perfil
    async AlterarPerfil({ id, idUsuario, foto_url, preferencias }: AlterarPerfil) {
        await prismaClient.perfil.update({
            where: {
                id: id // O Prisma usa o ID primário para encontrar o registro
            },
            data: {
                // Remova o idUsuario daqui para evitar erros de restrição @unique
                ...(foto_url && { foto_url: foto_url }),
                preferencias: preferencias
            }
        })

        return ({ dados: "Perfil Alterado com Sucesso" })
    }

    async DeletarPerfil({ id }: DeletarPerfil) {
        await prismaClient.perfil.delete({
            where: {
                id: id
            }
        })

        return ({ dados: "Perfil Deletado com Sucesso" })
    }
}

export { PerfilServices }