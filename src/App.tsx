import './App.css';
import { SelectWidget } from './components/layout/select-widget';

function App() {
  return (
    <div className="app">
      <SelectWidget selectionMaxAmount={3} />
    </div>
  );
}

export default App;
