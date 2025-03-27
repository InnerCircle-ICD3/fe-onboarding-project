import { useState } from "react";

const useTotalPrice = () => {
    const [totalPrice, setTotalPrice] = useState<number>(0);

    const increaseTotalPrice = (price: number) => {
        setTotalPrice(totalPrice + price);
    }

    const decreaseTotalPrice = (price: number) => {
        setTotalPrice(totalPrice - price);
    }
   
    const resetTotalPrice = () => {
        setTotalPrice(0);
    }

    return { totalPrice, increaseTotalPrice, decreaseTotalPrice, resetTotalPrice };
}

export default useTotalPrice