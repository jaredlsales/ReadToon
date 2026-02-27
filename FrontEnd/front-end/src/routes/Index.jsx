import Authenticated from "./authenticated";
import NotAuthenticated from "./NotAuthenticated";


export default function Rotas(){

    const autenticado =  false

    //Se a condição verdadeira vai aparecer Autenti.. ou vai se for false vai aparecer NotAuthenti..
    return(
        autenticado === true ? <Authenticated/> : <NotAuthenticated/>
    )
}
