import './Input.css';

interface InputProps {
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
}

export function Input(props: InputProps){
    return(
        <div>
            <div className="input">
                <br/>
                <input 
                    type={props.type} 
                    value={props.value}
                    onChange={props.onChange}
                    placeholder={props.placeholder}
                />
            </div>
        </div>
    );
}