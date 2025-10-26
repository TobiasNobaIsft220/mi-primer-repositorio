import './Button.css';

interface ButtonProps {
    texto: string;
    onClick: (e: React.FormEvent) => void;
    disabled: boolean;
}

export const Button = (props: ButtonProps) => {
    return(
        <div>
            <br/>
            <button type="submit" onClick={props.onClick} disabled={props.disabled}>
            {props.texto}
        </button>
        </div>
    );
};