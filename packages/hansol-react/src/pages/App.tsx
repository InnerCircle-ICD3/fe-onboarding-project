import { ControlButton, ControlInput, ControlPanel, ErrorMessage, InputGroup, LogPanel } from "../styles/controlPanel.ts"
import { Container } from "../styles/common.ts"
import { ProductGrid, VendingMachine, VendingMachineDisplay } from "../styles/vendingMachine.ts"

function App() {
  return (
    <Container>
      <VendingMachine>
        <VendingMachineDisplay />
        <ProductGrid>
          
        </ProductGrid>
      </VendingMachine>

      <ControlPanel>
        <InputGroup>
          <ControlInput/>
          <ControlButton>투입</ControlButton>
          <ControlButton>반환</ControlButton>
        </InputGroup>

        <ErrorMessage/>

        <LogPanel/>
      </ControlPanel>
    </Container>
  )
}

export default App