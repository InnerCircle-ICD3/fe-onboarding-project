import {insertAmount} from "./features/insertAmount.ts";

import {returnAmount} from "./features/returnAmount.ts";
import {renderProduct} from "./features/renderProduct.ts";

const amountInputElement = document.querySelector(".amount-inner-input") as HTMLInputElement;
amountInputElement.addEventListener('keydown', (event) => {
    if (['e', 'E', '-', '.'].includes(event.key)) {
        event.preventDefault();
    }
})

insertAmount();
returnAmount();
renderProduct();
