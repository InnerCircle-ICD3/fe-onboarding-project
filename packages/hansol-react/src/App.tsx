import ControlPanel from "./components/ControlPanel";
import VendingMachine from "./components/VendingMachine";
import { Container } from "./styles/layout";
import { products } from "./data/products";


function App() {
  return (
    <Container>
      <VendingMachine products={products}/>
      <ControlPanel />
    </Container>
  )
}

export default App;