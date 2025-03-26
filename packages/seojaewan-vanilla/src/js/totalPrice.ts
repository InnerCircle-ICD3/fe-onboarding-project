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

    public resetTotalPrice(): void {
        this.tempTotalPrice = 0;
        this.totalPrice = 0;
        this.isTemp = false;

        addLogging("남은 금액을 반환하였습니다.");
    }
}

export default TotalPrice;