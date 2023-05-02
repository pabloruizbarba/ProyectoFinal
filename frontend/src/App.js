import './App.css';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router';
import NotFound from './screens/NotFound/NotFound';
import Home from './screens/Home/Home';
import DevicesMenu from './screens/DevicesMenu/DevicesMenu';

function App() {
  return (
    <Routes>
      <Route path="/home" element={<Home />}></Route>
      <Route path="/devices-menu" element={<DevicesMenu />}></Route>
      <Route path="/" element={<Home />}></Route>
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
}

export default App;
