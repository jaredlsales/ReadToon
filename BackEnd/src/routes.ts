import {Router} from "express"
import {UsuarioControllers} from "./Controllers/UsuarioControllers"
import {PerfilControllers} from "./Controllers/PerfilControllers"
import {ManhwaControllers} from "./Controllers/ManhwaControllers"
import {CapituloControllers} from "./Controllers/CapituloControllers"


const routes = Router()

//Metodo POST
routes.post("/CadastrarUsuario", new UsuarioControllers().CadastrarUsuario)
routes.post("/AtualizarPerfil", new PerfilControllers().AtualizarPerfil)
routes.post("/CadastrarManhwa",new ManhwaControllers().CadastrarManhwa)
routes.post("/CadastrarCapitulos", new CapituloControllers().CadastrarCapitulos)

//Metodo GET
routes.get("/VisualizarUsuario", new UsuarioControllers().VisualizarUsuario)
routes.get("/VisualizarPerfil", new PerfilControllers().VisualizarPerfil)


export default routes