import { Router } from "express";
import {CadastroControllers } from "./Controllers/CadastroControllers/CadastroControllers"
import { UsuarioControllers } from "./Controllers/UsuarioControllers.ts/UsuarioControllers";
import {ManhuwaControllers} from "./Controllers/ManhuwaControllers/ManhuwaControllers"
import {CapituloControllers} from "./Controllers/CapituloControllers/CapituloControllers"

const router = Router()

//Criacao das Rotas de EndPoint
router.post("/CadastroControllers", new CadastroControllers().cadastroControllers)
router.post("/UsuarioControllers", new UsuarioControllers().usuarioControllers)
router.post("/ManhuwaControllers", new ManhuwaControllers().manhuwaControllers)
router.post("/CapituloControllers", new CapituloControllers().capituloControllers)

//Metodo GET
router.get("/VisualizarCadastro", new CadastroControllers().visualizarCadsatro)
router.get("/VisualizarCapitulo", new CapituloControllers().visualizarCapituo)
router.get("/VisualizarManhuwa", new ManhuwaControllers().visualizarManhuwa)
router.get("/VisualizarUsuario", new UsuarioControllers().visualizarUsuario)


export default router