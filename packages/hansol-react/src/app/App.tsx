import ControlPanel from "../components/ControlPanel";
import VendingMachine from "../components/VendingMachine";
import { Container } from "../styles/layout";
import { VendingMachineProvider } from "./provider/VendingMachineProvider";


function App() {
  return (
    <VendingMachineProvider>
      <Container>
        <VendingMachine />
        <ControlPanel />
      </Container>
    </VendingMachineProvider>
  )
}

export default App;