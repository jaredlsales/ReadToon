import {Router} from "express"
import {UsuarioControllers} from "./Controllers/UsuarioControllers"


const routes = Router()

//Metodo POST
routes.post("/CadastrarUsuario", new UsuarioControllers().CadastrarUsuario)



export default routes