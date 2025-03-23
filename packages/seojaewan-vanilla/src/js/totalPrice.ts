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

    private getCurrentValue(): number {
        return this.isTemp ? this.tempTotalPrice : this.totalPrice;
    }

    public updateTotalPrice(value: number): number {
        const currentValue = this.getCurrentValue();

        this.totalPrice = currentValue + value;
        this.tempTotalPrice = 0;
        this.isTemp = false;

        addLogging(`${value}원 추가하였습니다.`);

        return this.totalPrice;
    }

    public payment(name: string, value: number): number {
        const currentValue = this.getCurrentValue();

        if(value > currentValue) {
            this.tempTotalPrice = currentValue;
            this.totalPrice = value;

            this.isTemp = true;

            addLogging(`금액이 부족합니다.`);
            addLogging(`${name}을(를) 구매하지 못했습니다.`);
        } else {
            this.totalPrice -= value;
        
            addLogging(`${name}을(를) 구매하였습니다.`);
            addLogging(`${value}원을 사용했습니다.`);
        }
         
        return this.totalPrice;
    }
}

export default TotalPrice;