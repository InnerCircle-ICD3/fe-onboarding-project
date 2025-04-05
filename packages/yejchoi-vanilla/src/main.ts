import {insertAmount} from "./features/insertAmount.ts";

import {returnAmount} from "./features/returnAmount.ts";
import {renderProduct} from "./features/renderProduct.ts";

const amountInputElement = document.querySelector<HTMLInputElement>(".amount-inner-input");
const returnButtonElement = document.querySelector<HTMLButtonElement>('#return-button');
const insertButtonElement = document.querySelector<HTMLButtonElement>('#insert-button');

amountInputElement?.addEventListener('keydown', (event) => {
    if (['e', 'E', '-', '.'].includes(event.key)) {
        event.preventDefault();
    }
})

insertAmount({amountInputElement, insertButtonElement});
returnAmount({amountInputElement, returnButtonElement});
renderProduct();
