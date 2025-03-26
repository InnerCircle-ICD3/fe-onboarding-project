import addButtonList from "./buttonList";
import addPaymentEvent from "./payment";
import addInputEvent from "./priceInput";
import TotalPrice from "./totalPrice";

export const totalPrice = new TotalPrice()

addButtonList();
addInputEvent();
addPaymentEvent();
