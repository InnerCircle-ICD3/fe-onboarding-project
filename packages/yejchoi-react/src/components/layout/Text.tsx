import {text} from "../../styles/components/text.css.ts";
import {CSSProperties, ReactNode} from "react";

interface TextProps {
    children?: ReactNode;
    style?: CSSProperties;
    onClick? : () => void;
}

const Text = (props: TextProps) => {
    const { children, style, onClick, ...textVariants } = props;

    return (
        <p className={text(textVariants)} style={style} onClick={onClick}>
             children
        </p>
    );
};

export default Text;
