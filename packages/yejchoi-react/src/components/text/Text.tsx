import {text} from "./text.css.ts";
import {CSSProperties, ReactNode} from "react";
import {RecipeVariants} from "@vanilla-extract/recipes";

type textVariants = RecipeVariants<typeof text>

type TextProps =  textVariants &  {
    children?: ReactNode;
    style?: CSSProperties;
    onClick? : () => void;
}

const Text = (props: TextProps) => {
    const { children, style, onClick, ...textVariants } = props;

    return (
        <p className={text(textVariants)} style={style} onClick={onClick}>
            {children}
        </p>
    );
};

export default Text;
