import { Routes, Route } from 'react-router-dom';
import './App.css';
import Registration from './Components/Registration';
import Table from './Components/Table';

function App() {
  return (
    <div className="container text-center">
      <Routes>
        <Route path='' element={<Registration />} />
        <Route path='registration' element={<Registration />} />
        <Route path='show' element={<Table />} />
      </Routes>
    </div>
  );
}

export default App;
