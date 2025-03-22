import addLogging from "./logging";

class TotalPrice {
    private tempTotalPrice: number;
    private totalPrice: number;
    private isTemp: boolean;

    constructor() {
        this.tempTotalPrice = 0;
        this.totalPrice = 0;

        this.isTemp = false;
    }

    public getTempTotalPrice(): number {
        return this.tempTotalPrice;
    }

    public setTempTotalPrice(value: number): void {
        this.tempTotalPrice = value;
    }

    public getTotalPrice(): number {
        return this.totalPrice;
    }

    public setTotalPrice(value: number): void {
        this.totalPrice = value;
    }

    private getCurrentValue(): number {
        return this.isTemp ? this.tempTotalPrice : this.totalPrice;
    }

    public updateTotalPrice(value: number): number {
        const currentValue = this.getCurrentValue();

        this.totalPrice = currentValue + value;
        this.tempTotalPrice = 0;
        this.isTemp = false;

        addLogging(`${this.totalPrice}원 추가하였습니다.`);

        return this.totalPrice;
    }

    public payment(name: string, value: number): number {
        const currentValue = this.getCurrentValue();

        if(value > currentValue) {
            this.tempTotalPrice = currentValue;
            this.totalPrice = value;

            this.isTemp = true;
        } else {
            this.totalPrice -= value;
        }

        addLogging(`${name}을(를) 구매하였습니다.`);
        addLogging(`${value}원을 사용했습니다.`);
         
        return this.totalPrice;
    }
}

export default TotalPrice;