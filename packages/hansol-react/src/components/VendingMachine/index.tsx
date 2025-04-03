import {
  ProductGrid,
  VendingMachineContainer,
  VendingMachineDisplay,  
} from "./VendingMachine.styles";

const VendingMachine = () => {

  return (
    <VendingMachineContainer>
      <VendingMachineDisplay>{/* 잔액 표시용 상태값이 들어갈 예정 */}</VendingMachineDisplay>
      <ProductGrid>
        
      </ProductGrid>
    </VendingMachineContainer>
  );
};

export default VendingMachine;