import Button from "../../atoms/button";

interface MenuButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
    name: string;
    price: number;
    //
    onClick: (name: string, price: number) => void;
}

const MenuButton = (props: MenuButtonProps) => {
    const {name, price, onClick, ...rest} = props

    return <Button {...rest} onClick={() => onClick(name, price)}>
        <span>{name}</span>
        <span>{price}</span>
    </Button>
}

export default MenuButton;