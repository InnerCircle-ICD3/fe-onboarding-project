class TotalPrice {
    private totalPrice: number;

    constructor() {
        this.totalPrice = 0;
    }

    public updateTotalPrice(value: number): number {
        this.totalPrice += value;
        return this.totalPrice;
    }

    public payment(value: number): number {
        if(value > this.totalPrice) {
            return value;
        } else {
            this.totalPrice -= value;
            return this.totalPrice;
        }
    }
}

export default TotalPrice;