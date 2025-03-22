import { VendingMachine } from './components/VendingMachine/index.js';
import { ControlPanel } from './components/ControlPanel/index.js';

const App = () => {
  return `
    <div class="vending-machine-container">
      ${VendingMachine()}
      ${ControlPanel()}
    </div>
  `;
};

const root = document.getElementById('app');
root.innerHTML = App();