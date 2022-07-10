import { Routes, Route } from 'react-router-dom';
import './App.css';
import EditUserData from './Components/EditUserData';
import PageNotFound from './Components/PageNotFound';
import Registration from './Components/Registration';
import Table from './Components/Table';

function App() {
  return (
    <div className="container text-center">
      <Routes>
        <Route path='' element={<Registration />} />
        <Route path='registration' element={<Registration />} />
        <Route path='show' element={<Table />} />
        <Route path='edit/:userId' element={<EditUserData />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
