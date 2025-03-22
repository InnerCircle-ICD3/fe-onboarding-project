import addButtonList from "./button-list";
import addPaymentEvent from "./payment";
import addInputEvent from "./price-input";
import TotalPrice from "./totalPrice";

export const totalPrice = new TotalPrice()

addButtonList();
addInputEvent();
addPaymentEvent();
