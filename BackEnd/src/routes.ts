import {Router} from "express"
import {UsuarioControllers} from "./Controllers/UsuarioControllers"
import {PerfilControllers} from "./Controllers/PerfilControllers"
import {ManhwaControllers} from "./Controllers/ManhwaControllers"
import {CapituloControllers} from "./Controllers/CapituloControllers"
import uploadConfig from "./Config/Multer"
import multer from "multer"


const routes = Router()

const upload = multer(uploadConfig.upload("./tmp"))

//Metodo POST
routes.post("/CadastrarUsuario", new UsuarioControllers().CadastrarUsuario)
routes.post("/AtualizarPerfil", new PerfilControllers().AtualizarPerfil)
//Meotodo POST "upload file"
routes.post("/CadastrarCapitulos", upload.single("file"), new CapituloControllers().CadastrarCapitulos)
routes.post("/CadastrarManhwa", upload.single("file"), new ManhwaControllers().CadastrarManhwa)

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