import './Css/App.css';
import Table from './components/Table';
import buildings from './data.js';

function App() {
  return (
    <div className="App">
      <Table data={buildings} amountRows={20}/>
    </div>
  );
}

export default App;
