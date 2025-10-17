import './BotonSubmit.css';

interface BotonSubmitProps {
    texto: string;
    onClick: (e: React.FormEvent) => void;
}

export const BotonSubmit = (props: BotonSubmitProps) => {
    return(
        <div>
            <br/>
            <button type="submit" onClick={props.onClick}>
            {props.texto}
        </button>
        </div>
    );
};

