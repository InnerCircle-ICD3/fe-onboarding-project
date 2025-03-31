
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
    onMouseDown ?: (data : any) => void;
    onMouseUp?: (data : any) => void;

}

const Button = (props : ButtonProps) => {
    const {label, style, width,onClick, onMouseDown ,  onMouseUp ,height , ...variants} = props


    return <button className={button(variants)} onClick={onClick} onMouseDown={onMouseDown} onMouseUp={onMouseUp} style={{...style, width, height}}>{label}</button>

}

export default Button;