
import {CSSProperties} from "react";
import {RecipeVariants} from "@vanilla-extract/recipes";
import {button} from "./button.css.ts";

type FlexVariants = RecipeVariants<typeof button>

type ButtonProps =  FlexVariants & {
    label?: string;
    style?: CSSProperties;
    width?: string;
    height?: string;
    onClick?: () => void;
}

const Button = (props : ButtonProps) => {
    const {label, style, width, onClick ,height , ...variants} = props


    return <button className={button(variants)} onClick={onClick} style={{...style, width, height}}>{label}</button>

}

export default Button;