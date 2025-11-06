import { Router } from "express";
import {CadastroControllers } from "./Controllers/CadastroControllers/CadastroControllers"

const router = Router()

//Criacao das Rotas de EndPoint
router.post("/CadastroControllers", new CadastroControllers().cadastroControllers)


export default router