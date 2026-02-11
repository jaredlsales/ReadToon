import {Request, Response, NextFunction} from "express"
import {verify} from "jsonwebtoken"

interface User {
    sub: string
}

function estaAutenticado(req:Request, res:Response, next:NextFunction){
    const autToken =  req.headers.authorization
    //console.log(autToken)
    if (!autToken){
        return res.json({dados:"Token Inexistente"})
    }
    //console.log(autToken)

    const [, token] = autToken.split(" ")
    //console.log(token)
    try {
        const {sub} = verify(
            token,
            process.env.JWT_SECRET
        ) as User
        //console.log(sub)
        //userID = Variavel de Ambiente
        req.userID = sub
        //Next = Vai passar para o Cotrollers depois de autenticado
        return next()
    } catch (err) {
        //Pode ser Token Invalido ou Experido
        return res.json({dados:"Token Invalido"})
    }
}

export {estaAutenticado}