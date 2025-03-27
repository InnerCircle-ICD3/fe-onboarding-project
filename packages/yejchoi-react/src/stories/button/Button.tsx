
import {CSSProperties} from "react";
import {RecipeVariants} from "@vanilla-extract/recipes";
import {button} from "../../styles/components/button.css.ts";


type FlexVariants = RecipeVariants<typeof button>

type ButtonProps =  FlexVariants & {
    label?: string;
    style?: CSSProperties;
    width?: string;
    height?: string;
}

const Button = (props : ButtonProps) => {
    const {label, style, width,height , ...variants} = props


    return <button className={button(variants)} style={{...style, width, height}}>{label}</button>

}

export default Button;