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

//Metodo POST Login
routes.post("/LoginUsuario", new UsuarioControllers().LoginUsuario)

//Metodo GET
routes.get("/VisualizarUsuario", new UsuarioControllers().VisualizarUsuario)
routes.get("/VisualizarPerfil", new PerfilControllers().VisualizarPerfil)
routes.get("/VisualizarManhwa", new ManhwaControllers().VisualizarManhwa)
routes.get("/VisualizarCapitulos", new CapituloControllers().VisualizarCapitulos)

//Metogo PUT
routes.put("/AlterarUsuario", new UsuarioControllers().AlterarUsuario)
routes.put("/AlterarPerfil", new PerfilControllers().AlterarPerfil)
routes.put("/AlterarManhwa", new ManhwaControllers().AlterarManhwa)
routes.put("/AlterarCapitulos", new CapituloControllers().AlterarCapitulos)

//Metodo DELETE
routes.delete("/DeletarUsuario/:id", new UsuarioControllers().DeletarUsuario)
routes.delete("/DeletarPerfil/:id", new PerfilControllers().DeletarPerfil)
routes.delete("/DeletarManhwa/:id", new ManhwaControllers().DeletarManhwa)
routes.delete("/DeletarCapitulos/:id", new CapituloControllers().DeletarCapitulos)



export default routes