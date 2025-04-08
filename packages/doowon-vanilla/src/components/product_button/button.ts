/**
 * Button component that displays a product name and price
 */
export class Button {
  private productName: string;
  private price: number;

  constructor(productName: string, price: number) {
    this.productName = productName;
    this.price = price;
  }

  private formatPrice(): string {
    if (this.price === 0) {
      return '';
    }
    return `₩${this.price.toLocaleString()}`;
  }

  render(): HTMLButtonElement {
    const button = document.createElement('button');
    button.className = "flex flex-col items-center justify-center w-40 h-20 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded";
    
    const nameSpan = document.createElement('span');
    nameSpan.className = "text-lg";
    nameSpan.textContent = this.productName;
    
    const priceSpan = document.createElement('span');
    priceSpan.className = "text-base";
    priceSpan.textContent = this.formatPrice();
    
    button.appendChild(nameSpan);
    button.appendChild(priceSpan);
    
    return button;
  }
}
