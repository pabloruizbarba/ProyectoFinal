import logo from './logo.svg';
import './App.css';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router';

function App() {
  return (
    <Routes>
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
}

export default App;
