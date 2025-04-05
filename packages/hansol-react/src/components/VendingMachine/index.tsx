import {
  ProductGrid,
  VendingMachineContainer,
  VendingMachineDisplay,
  ProductButton,
  ProductName,
  ProductPrice,
} from "./VendingMachine.styles";

import { useLogMessageDispatch } from "../../store/logMessage/LogMessageContext";
import { appendParticle, formatCurrencyKRW } from "../../utils/common";
import { products } from "../../data/products";
import { useBalanceDispatch, useBalanceState } from "../../store/balance/BalanceContext";
import { useState } from "react";

const VendingMachine = () => {
  const PRODUCT_COLUMN_COUNT = 3;
  const PRODUCT_ROW_COUNT = Math.ceil(products.length / PRODUCT_COLUMN_COUNT);
  const TOTAL_SLOT = PRODUCT_COLUMN_COUNT * PRODUCT_ROW_COUNT;

  const [isError, setIsError] = useState(false);

  const balanceState = useBalanceState();
  const { balance } = balanceState;
  const balanceDispatch = useBalanceDispatch();
  const logMessageDispatch = useLogMessageDispatch();

  const slots = Array.from({ length: TOTAL_SLOT }, (_, index) => {
    const product = products[index];

    if (product) {
      return (
        <ProductButton data-testid="product-button" key={index} onClick={() => handleProductClick(product.name, product.price)}>
          <ProductName>{product.name}</ProductName>
          <ProductPrice>{product.price}</ProductPrice>
        </ProductButton>
      );
    } else {
      return <ProductButton data-testid="product-button" key={index} disabled />;
    }
  });

  function handleProductClick(name: string, price: string) {
    const priceValue = Number(price.replace(/[^0-9]/g, ''));
    if (balance < priceValue) {
      setIsError(true);
      return;
    }

    setIsError(false);
    balanceDispatch({ type: 'PURCHASE_PRODUCT', payload: priceValue });
    logMessageDispatch({ type: 'ADD_LOG_MESSAGE', payload: `${appendParticle(name)} 구매했습니다.` });
  }

  return (
    <VendingMachineContainer data-testid="vending-machine-container">
      <VendingMachineDisplay data-testid="vending-machine-display" isError={isError}>{formatCurrencyKRW(balance)}</VendingMachineDisplay>
      <ProductGrid data-testid="product-grid">
        {slots}
      </ProductGrid>
    </VendingMachineContainer>
  );
};

export default VendingMachine;