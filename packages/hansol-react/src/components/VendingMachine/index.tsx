import {
  ProductGrid,
  VendingMachineContainer,
  VendingMachineDisplay,
  ProductButton,
  ProductName,
  ProductPrice,
} from "./VendingMachine.styles";
import { products } from "../../data/products";
import { formatCurrencyKRW } from "../../utils/common";

const VendingMachine = () => {
  const PRODUCT_COLUMNS = 3;
  const PRODUCT_ROWS = Math.ceil(products.length / PRODUCT_COLUMNS);
  const TOTAL_SLOT = PRODUCT_COLUMNS * PRODUCT_ROWS;

  const slots = Array.from({ length: TOTAL_SLOT }, (_, index) => {
    const product = products[index];

    if (product) {
      return (
        <ProductButton key={index}>
          <ProductName>{product.name}</ProductName>
          <ProductPrice>{formatCurrencyKRW(Number(product.price.replace(/원/, '')))}원</ProductPrice>
        </ProductButton>
      );
    } else {
      return <ProductButton key={index} disabled />;
    }
  });

  return (
    <VendingMachineContainer>
      <VendingMachineDisplay>{/* 잔액 표시용 상태값이 들어갈 예정 */}</VendingMachineDisplay>
      <ProductGrid>
        {slots}
      </ProductGrid>
    </VendingMachineContainer>
  );
};

export default VendingMachine;