import { SelectWidget } from './components/layout/select-widget';
import { MODAL_ROOT_ID } from './components/layout/modal'

function App() {
  return (
    <>
      <SelectWidget selectionMaxAmount={3} />
      <div id={MODAL_ROOT_ID}></div>
    </>
  );
}

export default App;
