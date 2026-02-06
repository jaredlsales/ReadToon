import {Router} from "express"
import {UsuarioControllers} from "./Controllers/UsuarioControllers"
import {PerfilControllers} from "./Controllers/PerfilControllers"
import {ManhwaControllers} from "./Controllers/ManhwaControllers"


const routes = Router()

//Metodo POST
routes.post("/CadastrarUsuario", new UsuarioControllers().CadastrarUsuario)
routes.post("/AtualizarPerfil", new PerfilControllers().AtualizarPerfil)
routes.post("/CadastrarManhwa",new ManhwaControllers().CadastrarManhwa)




export default routes