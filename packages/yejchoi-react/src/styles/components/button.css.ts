import {recipe} from "@vanilla-extract/recipes";
import {vars} from "../theme.css.ts";

export const button = recipe({
    base : {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '400',
        lineHeight: '24px',
    },
    variants:{
        size: {
            md: { height: '30px', padding: '8px 24px', gap: '6px' },
            lg: { height: '40px', padding: '10px 24px', gap: '10px' },
        },
        disabled: {
            true: {
                pointerEvents: 'none',
                background: vars.themeColor.color.disabledBg,
                color: vars.themeColor.color.disabledText,

                '*': {
                    fill: vars.themeColor.color.disabledText,
                    stroke: vars.themeColor.color.disabledText,
                },
            },
            false: {},
        },
    },
    defaultVariants: {
        size: 'md',
        disabled: false,
    },
})