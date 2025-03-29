import {flex} from "./flex.css.ts";
import {RecipeVariants} from "@vanilla-extract/recipes";

import {CSSProperties, ReactNode} from "react";

type FlexVariants = RecipeVariants<typeof flex>

type FlexProps =  FlexVariants & {
    children?: ReactNode;
    style?: CSSProperties;
    gap?: string;
    width?: string;
    height?: string;
}

const Flex = (props : FlexProps) => {
    const { children, style,gap, width, height, ...variants } = props;

    return (
        <div className={flex(variants)} style={{ width, height, gap, ...style}}>
            children
        </div>
    )
}

export default Flex