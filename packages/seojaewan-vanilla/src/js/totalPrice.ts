class TotalPrice {
    private tempTotalPrice: number;
    private totalPrice: number;
    private isTemp: boolean;

    constructor() {
        this.tempTotalPrice = 0;
        this.totalPrice = 0;

        this.isTemp = false;
    }

    private getCurrentValue(): number {
        return this.isTemp ? this.tempTotalPrice : this.totalPrice;
    }

    public updateTotalPrice(value: number): number {
        const currentValue = this.getCurrentValue();

        this.totalPrice = currentValue + value;
        this.tempTotalPrice = 0;
        this.isTemp = false;

        return this.totalPrice;
    }

    public payment(value: number): number {
        const currentValue = this.getCurrentValue();

        if(value > currentValue) {
            this.tempTotalPrice = currentValue;
            this.totalPrice = value;

            this.isTemp = true;
        } else {
            this.totalPrice -= value;
        }

         
        return this.totalPrice;
    }
}

export default TotalPrice;