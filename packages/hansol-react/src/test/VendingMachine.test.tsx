import { render, screen, within } from '@testing-library/react';
import VendingMachine from '../components/VendingMachine';
import { describe, expect, it } from 'vitest';
import { products } from '../data/products';

describe('VendingMachine', () => {
  const PRODUCT_COLUMNS = 3;
  const PRODUCT_ROWS = Math.ceil(products.length / PRODUCT_COLUMNS);;
  const TOTAL_SLOT = PRODUCT_COLUMNS * PRODUCT_ROWS;

  it('자판기 영역의 컨테이너가 렌더링된다.', () => {
    render(<VendingMachine products={products} />);
    expect(screen.getByTestId('vending-machine-container')).toBeInTheDocument();
  });
  it('자판기 잔액 화면이 렌더링된다.', () => {
    render(<VendingMachine products={products} />);
    expect(screen.getByTestId('vending-machine-display')).toBeInTheDocument();
  });
  it('상품 버튼 영역이 렌더링된다.', () => {
    render(<VendingMachine products={products} />);
    expect(screen.getByTestId('product-grid')).toBeInTheDocument();
  });
  it("상품 버튼이 총 슬롯 수만큼 렌더링된다.", () => {
    render(<VendingMachine products={products} />);
    const allButtons = screen.getAllByTestId("product-button");
    expect(allButtons).toHaveLength(TOTAL_SLOT);
  })

  it('상품이 있는 경우 name과 price가 함께 렌더링된다.', () => {
    render(<VendingMachine products={products} />);
    
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
    render(<VendingMachine products={products} />);
    const allButtons = screen.getAllByTestId("product-button");
    const disabledButtons = allButtons.filter((btn) => btn.hasAttribute("disabled"));

    expect(disabledButtons).toHaveLength(TOTAL_SLOT - products.length);
  });
});