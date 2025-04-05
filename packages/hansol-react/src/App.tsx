import ControlPanel from "./components/ControlPanel";
import VendingMachine from "./components/VendingMachine";
import { Container } from "./styles/layout";


function App() {
  return (
    <Container>
      <VendingMachine />
      <ControlPanel />
    </Container>
  )
}

export default App;