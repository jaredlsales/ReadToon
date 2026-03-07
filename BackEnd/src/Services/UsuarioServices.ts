import prismaClient from "../Prisma/PrismaClient";
import { compare, hash } from "bcryptjs"
import { sign } from "jsonwebtoken";

interface CadastrarUsuario {
    nome: string,
    email: string,
    senha: string

}

interface LoginUsuario {
    email: string,
    senha: string
}

interface AtualizarrUsuario {
    id: string,
    nome: string,
    email: string,
    senha: string

}

interface DeletarUsuario {
    id: string
}

interface AtualizarSenha {
    usuario_id: string;
    senhaAntiga: string;
    novaSenha: string;
}



class UsuarioServices {
    async cadastrarUsuario({ nome, email, senha }: CadastrarUsuario) {
        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error("Invalid email address");
        }

        // Validar senha forte
        const senhaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (!senhaRegex.test(senha)) {
            throw new Error("The password must be at least 8 characters long, with one uppercase letter, one lowercase letter, and one number.");
        }
        //emailExiste = faz uma consunta no bando de dados se já existe na base de dados
        //OR = Não dizer qual está cadastrado e uma boa pratica
        const emailExiste = await prismaClient.usuario.findFirst({
            where: {
                OR: [
                    {
                        email: email
                    },

                ]
            }
        })

        if (emailExiste) {
            throw new Error("Email is already registered!")
        }

        //senhaCrypte =  Seria a Cryptografia do senha com uma hash
        // 8 - 10 é um numero padrão, pela quantiade de vezes que ele vai criptgrofar
        const senhaCrypte = await hash(senha, 10)

        await prismaClient.usuario.create({

            data: {
                nome,
                email,
                senha: senhaCrypte
            }
        })

        return ({ dados: "Registration Successful" })
    }

    async LoginUsuario({ email, senha }: LoginUsuario) {
        const emailExiste = await prismaClient.usuario.findFirst({
            where: {
                email: email
            }
        })

        if (!emailExiste) {
            throw new Error("Incorrect Login")
        }

        const senhaCrypte = await compare(senha, emailExiste.senha)
        //console.log(senhaCrypte)
        if (!senhaCrypte) {
            throw new Error("Incorrect email or password")

        }

        const token = sign({
            id: emailExiste.id,
            nome: emailExiste.nome,
            email: emailExiste.email
        },
            //Pegando variavel de ambiente -- subkect = sub = id (vai comparar o id do front com o back)
            process.env.JWT_SECRET,
            {
                subject: emailExiste.id,
                expiresIn: "12h"
            }
        )
        return {
            id: emailExiste.id,
            nome: emailExiste.nome,
            email: emailExiste.email,
            token: token
        }

    }

    async visualizarUsuario() {
        const resposta = await prismaClient.usuario.findMany({
            select: {
                id: true,
                nome: true,
                email: true,
                senha: true
            }
        })
        return resposta
    }

    async AlterarUsuario({ id, nome, email, senha }: AtualizarrUsuario) {
        //hash quando alterar a senha 
        const senhaCrypte = await hash(senha, 10)
        await prismaClient.usuario.update({
            where: {
                id: id
            },
            data: {
                nome: nome,
                email: email,
                senha: senhaCrypte

            }

        })

        return ({ dados: "User Changed Successfully" })
    }

    async alterarSenha({ usuario_id, senhaAntiga, novaSenha }: AtualizarSenha) {
        const usuario = await prismaClient.usuario.findUnique({
            where: { id: usuario_id }
        });

        if (!usuario) {
            throw new Error("User not found");
        }

        // Compara a senha antiga com a do banco
        const senhaBate = await compare(senhaAntiga, usuario.senha);
        if (!senhaBate) {
            throw new Error("Current password incorrect");
        }

        // Gera o novo hash
        const novaSenhaHash = await hash(novaSenha, 10);

        await prismaClient.usuario.update({
            where: { id: usuario_id },
            data: { senha: novaSenhaHash }
        });

        return { dados: "Password changed successfully!" };
    }

    async DeletarUsuario({ id }: DeletarUsuario) {
        await prismaClient.usuario.delete({
            where: {
                id: id
            }

        })

        return ({ dados: "User successfully deleted!" })
    }

}


export { UsuarioServices }