import './Button.css';

const Button = ({text, type, onClick}: {
    text: string;
    type?: string;
    onClick: () => void;
}) => {

    return (
        <button
            className={`Button Button_${type}`}
            onClick={onClick}>
            {text}
        </button>
    )
}

export default Button;