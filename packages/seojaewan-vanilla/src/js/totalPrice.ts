class TotalPrice {
    private totalPrice: number;

    constructor() {
        this.totalPrice = 0;
    }

    public getTotalPrice(): number {
        return this.totalPrice;
    }

    public updateTotalPrice(value: number): number {
        this.totalPrice += value;
        return this.totalPrice;
    }

    public resetTotalPrice(): number {
        this.totalPrice = 0;
        return this.totalPrice;
    }
}

export default TotalPrice;