export const convertLocaleTextToNum = (localeText: string) => {
    return Number(localeText.replace(",", ""));
}