import './Header.css';
import Button from "./Button.tsx";

const Header = ({title, leftChild, rightChild}: {
    title: string;
    leftChild?: Button;
    rightChild?: Button;
}) => {
    return (

        <header className={"Header"}>
            <div className={"header_left"}>
                {leftChild}
            </div>
            <div className={"header_center"}>
                {title}
            </div>
            <div className={"header_right"}>
                {rightChild}
            </div>
        </header>
    )
}

export default Header;