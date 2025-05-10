import { fireEvent, screen, within } from '@testing-library/react';
import VendingMachine from '../components/VendingMachine';
import { describe, expect, it, vi } from 'vitest';
import { renderWithProviders } from './renderWithProviders';
import { appendParticle, formatCurrencyKRW } from '../utils/common';

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

describe('VendingMachine UI 렌더링', () => {
  const PRODUCT_COLUMNS = 3;
  const PRODUCT_ROWS = Math.ceil(products.length / PRODUCT_COLUMNS);;
  const TOTAL_SLOT = PRODUCT_COLUMNS * PRODUCT_ROWS;

  it('자판기 영역의 컨테이너가 렌더링된다.', () => {
    renderWithProviders(<VendingMachine />);
    expect(screen.getByTestId('vending-machine-container')).toBeInTheDocument();
  });
  it('자판기 잔액 화면이 렌더링된다.', () => {
    renderWithProviders(<VendingMachine />);
    expect(screen.getByTestId('vending-machine-display')).toBeInTheDocument();
  });
  it('상품 버튼 영역이 렌더링된다.', () => {
    renderWithProviders(<VendingMachine />);
    expect(screen.getByTestId('product-grid')).toBeInTheDocument();
  });
  it("상품 버튼이 총 슬롯 수만큼 렌더링된다.", () => {
    renderWithProviders(<VendingMachine />);
    const allButtons = screen.getAllByTestId("product-button");
    expect(allButtons).toHaveLength(TOTAL_SLOT);
  })

  it('상품이 있는 경우 name과 price가 함께 렌더링된다.', () => {
    renderWithProviders(<VendingMachine />);
    
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
    renderWithProviders(<VendingMachine />);
    const allButtons = screen.getAllByTestId("product-button");
    const disabledButtons = allButtons.filter((btn) => btn.hasAttribute("disabled"));

    expect(disabledButtons).toHaveLength(TOTAL_SLOT - products.length);
  });
});

describe('handleProductClick()', () => {
  it('잔액이 부족한 상태에서 상품을 클릭하면 잔액은 유지되고, 표시창에 빨간 테두리 스타일이 적용된다.', () => {
    renderWithProviders(<VendingMachine />, {
      balanceState: { balance: 100 },
    });

    const productButton = screen.getAllByTestId('product-button')[0];
    fireEvent.click(productButton);

    expect(screen.getByTestId('vending-machine-display')).toHaveTextContent(formatCurrencyKRW(100));
    expect(screen.getByTestId('vending-machine-display')).toHaveStyle('border: 2px solid red');
  });

  it('잔액이 충분하면 "PURCHASE_PRODUCT" 및 "ADD_LOG_MESSAGE" 액션이 호출된다.', () => {
    const mockBalanceDispatch = vi.fn();
    const mockLogDispatch = vi.fn();

    renderWithProviders(<VendingMachine />, {
      balanceState: { balance: 5000 },
      balanceDispatch: mockBalanceDispatch,
      logDispatch: mockLogDispatch,
    });

    const { name, price } = products[0];
    const priceNumber = Number(price.replace(/[^0-9]/g, ''));
    const message = `${appendParticle(name)} 구매했습니다.`;

    const productButton = screen.getAllByTestId('product-button')[0];
    fireEvent.click(productButton);

    expect(mockBalanceDispatch).toHaveBeenCalledWith({
      type: 'PURCHASE_PRODUCT',
      payload: priceNumber,
    });

    expect(mockLogDispatch).toHaveBeenCalledWith({
      type: 'ADD_LOG_MESSAGE',
      payload: message,
    });
  });
});