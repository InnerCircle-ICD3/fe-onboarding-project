import { render, screen, within } from '@testing-library/react';
import VendingMachine from '../components/VendingMachine';
import { describe, expect, it } from 'vitest';

interface Product {
  name: string,
  price: string
}

const products: Product[] = [
  { name: '콜라', price: '1500원' },
  { name: '속이사이다', price: '1700원' },
  { name: '판타지판타', price: '1500원' },
  { name: '오뎅국물', price: '1800원' },
  { name: '부장라떼', price: '800원' },
  { name: '판타지판타', price: '1500원' },
  { name: '레드불', price: '2500원' },
  { name: '핫세븐', price: '1900원' },
  { name: '커피우유', price: '1400원' },
  { name: '딸기우유', price: '1400원' },
  { name: '초코우유', price: '1400원' },
];

describe('VendingMachine', () => {
  const PRODUCT_COLUMNS = 3;
  const PRODUCT_ROWS = Math.ceil(products.length / PRODUCT_COLUMNS);;
  const TOTAL_SLOT = PRODUCT_COLUMNS * PRODUCT_ROWS;

  it('자판기 영역의 컨테이너가 렌더링된다.', () => {
    render(<VendingMachine />);
    expect(screen.getByTestId('vending-machine-container')).toBeInTheDocument();
  });
  it('자판기 잔액 화면이 렌더링된다.', () => {
    render(<VendingMachine />);
    expect(screen.getByTestId('vending-machine-display')).toBeInTheDocument();
  });
  it('상품 버튼 영역이 렌더링된다.', () => {
    render(<VendingMachine />);
    expect(screen.getByTestId('product-grid')).toBeInTheDocument();
  });
  it("상품 버튼이 총 슬롯 수만큼 렌더링된다.", () => {
    render(<VendingMachine />);
    const allButtons = screen.getAllByTestId("product-button");
    expect(allButtons).toHaveLength(TOTAL_SLOT);
  })

  it('상품이 있는 경우 name과 price가 함께 렌더링된다.', () => {
    render(<VendingMachine />);
    
    const allButtons = screen.getAllByTestId('product-button');
    const enabledButtons = allButtons.filter((btn) => !btn.hasAttribute('disabled'));

    expect(enabledButtons).toHaveLength(products.length);

    enabledButtons.forEach((button, index) => {
      const { name, price } = products[index];
      const utils = within(button);
      expect(utils.getByText(name)).toBeInTheDocument();
      expect(utils.getByText(price)).toBeInTheDocument();
    });
  });

  it("상품 개수가 3의 배수가 아닐 경우, 남은 슬롯은 자동으로 disabled 처리되어 채워진다.", () => {
    render(<VendingMachine />);
    const allButtons = screen.getAllByTestId("product-button");
    const disabledButtons = allButtons.filter((btn) => btn.hasAttribute("disabled"));

    expect(disabledButtons).toHaveLength(TOTAL_SLOT - products.length);
  });
});