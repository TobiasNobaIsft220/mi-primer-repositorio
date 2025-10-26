import { Button } from "./Button";

interface paginacionProps{
    paginaActual: number;
    paginasTotales: number;
    siguiente: () => void;
    atras: () => void;
    
}

export function FuncionPaginacion(props: paginacionProps){

    return(
        <div>
            <div>
                <Button
                texto="Atras"
                onClick={props.atras}
                disabled={props.paginaActual === 1}
                />
            </div>

            <div>
                <Button
                texto="Siguiente"
                onClick={props.siguiente}
                disabled={props.paginaActual === props.paginasTotales}
                />
            </div>
        </div>
    );
}