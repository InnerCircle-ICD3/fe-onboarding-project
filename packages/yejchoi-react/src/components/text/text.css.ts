import {vars} from "../../styles/theme.css.ts";
import {recipe} from "@vanilla-extract/recipes";

export const text = recipe({
    base: {
        display: 'inline-block',
    },
    variants: {
        weight: {
            regular: { fontWeight: vars.fontWeight.regular },
            medium: { fontWeight: vars.fontWeight.medium },
            bold: { fontWeight: vars.fontWeight.bold },
            extraBold: { fontWeight: vars.fontWeight.extraBold },
        },
        size: {
            xs: { fontSize: vars.fontSize.xs, lineHeight: '16px' },
            sm: { fontSize: vars.fontSize.sm, lineHeight: '24px' },
            md: { fontSize: vars.fontSize.md, lineHeight: '26px' },
            lg: { fontSize: vars.fontSize.lg, lineHeight: '28px' },
            xl: { fontSize: vars.fontSize.xl, lineHeight: '30px' },
            '2xl': { fontSize: vars.fontSize['2xl'], lineHeight: '32px' },
            '3xl': { fontSize: vars.fontSize['3xl'], lineHeight: '34px' },
        },
        color: {
            primary: { color: vars.themeColor.color.primary },
            title: { color: vars.themeColor.color.text.title },
            main: { color: vars.themeColor.color.text.main },
            sub: { color: vars.themeColor.color.text.sub },
            white: { color: vars.color.white },
            red: { color: vars.color.red },
        },
        align: {
            left: { textAlign: 'left' },
            center: { textAlign: 'center' },
            right: { textAlign: 'right' },
        },
    },
    defaultVariants: {
        weight: 'regular',
        size: 'sm',
        color: 'main',
    },
});