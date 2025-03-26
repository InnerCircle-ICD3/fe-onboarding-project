import {RecipeVariants} from "@vanilla-extract/recipes";
import {grid} from "../../styles/components/grid.css.ts";
import {CSSProperties, ReactNode} from "react";

type GridVariants = RecipeVariants<typeof grid>

type GridProps = GridVariants & {
    children?: ReactNode;
    style?: CSSProperties;
    gridColumns: number;
    gap?: string;
}

const Grid = (props : GridProps) => {

    const {children, style, gridColumns, gap, ...variants   } = props

    return (
        <div
            className={grid(variants)}
            style={{
                gridTemplateColumns : `repeat(${gridColumns}, 1fr)`,
                gap,
                ...style
            }}
        >
            {children}
        </div>
    )



}

export default Grid