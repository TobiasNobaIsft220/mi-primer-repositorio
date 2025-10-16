interface BotonSubmitProps {
    texto: string;
    onClick: (e: React.FormEvent) => void;
}

export const BotonSubmit = (props: BotonSubmitProps) => {
    return(
        <button type="submit" onClick={props.onClick}>
            {props.texto}
        </button>
    );
};

