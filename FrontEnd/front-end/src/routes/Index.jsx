import Authenticated from "./authenticated";
import NotAuthenticated from "./NotAuthenticated";


export default function Rotas(){

    const token = localStorage.getItem("@readtoon:token");


    //Se a condição verdadeira vai aparecer Autenti.. ou vai se for false vai aparecer NotAuthenti..
    return(
        token ? <Authenticated/> : <NotAuthenticated/>
    )
}
