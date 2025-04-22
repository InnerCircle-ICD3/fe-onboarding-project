import { Product } from "../../data/products";
import {
  ProductGrid,
  VendingMachineContainer,
  VendingMachineDisplay,
  ProductButton,
  ProductName,
  ProductPrice,
} from "./VendingMachine.styles";

interface VendingMachineProps {
  products: Product[];
}

const VendingMachine = ({ products }: VendingMachineProps) => {
  const PRODUCT_COLUMNS = 3;
  const PRODUCT_ROWS = Math.ceil(products.length / PRODUCT_COLUMNS);
  const TOTAL_SLOT = PRODUCT_COLUMNS * PRODUCT_ROWS;

  const slots = Array.from({ length: TOTAL_SLOT }, (_, index) => {
    const product = products[index];

    if (product) {
      return (
        <ProductButton data-testid="product-button" key={index}>
          <ProductName>{product.name}</ProductName>
          <ProductPrice>{product.price}</ProductPrice>
        </ProductButton>
      );
    } else {
      return <ProductButton data-testid="product-button" key={index} disabled />;
    }
  });

  return (
    <VendingMachineContainer data-testid="vending-machine-container">
      <VendingMachineDisplay data-testid="vending-machine-display">{/* 잔액 표시용 상태값 */}</VendingMachineDisplay>
      <ProductGrid data-testid="product-grid">
        {slots}
      </ProductGrid>
    </VendingMachineContainer>
  );
};

export default VendingMachine;