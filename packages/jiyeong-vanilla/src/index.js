import { VendingMachine } from './components/VendingMachine/index.js';
import { ControlPanel } from './components/ControlPanel/index.js';

const App = () => {
  return `
    <div class="vending-machine-wrapper">
      ${VendingMachine()}
      ${ControlPanel()}
    </div>
  `;
};

const root = document.getElementById('app');
root.innerHTML = App();