import {Router} from "express"
import {UsuarioControllers} from "./Controllers/UsuarioControllers"
import {PerfilControllers} from "./Controllers/PerfilControllers"


const routes = Router()

//Metodo POST
routes.post("/CadastrarUsuario", new UsuarioControllers().CadastrarUsuario)
routes.post("/AtualizarPerfil", new PerfilControllers().AtualizarPerfil)



export default routes