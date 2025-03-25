export const amountStore = (() => {
    let totalAmount = 0

    return {
        getAmount : () => totalAmount,

        setAmount : (value : number) => {
            totalAmount = value
        },

        resetAmount : () => {
            totalAmount = 0
        }
    };
})();