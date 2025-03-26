import { useState } from "react";

const useTotalPrice = () => {
    const [totalPrice, setTotalPrice] = useState(0);

    return {
        totalPrice,
    }
}

export default useTotalPrice