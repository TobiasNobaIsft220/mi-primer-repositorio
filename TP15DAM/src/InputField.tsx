import './InputField.css';

interface InputFieldProps {
    label: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
}

export function InputField(props: InputFieldProps){
    return(
        <div>
            <div className="input-field">
                <label>{props.label}</label>
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