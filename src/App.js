import React from 'react';  
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  
import Login from './components/Login';  
import Register from './components/Register';  
import KorbanList from './components/KorbanList';
import GunungList from './components/GunungList';  
import { Provider } from 'react-redux';  
import store from './redux/store';  
  
const App = () => {  
  return (  
    <Provider store={store}>  
      <Router>  
        <Routes>  
          <Route path="/" element={<GunungList />} /> {/* Menampilkan GunungList di rute utama */}  
          <Route path="/login" element={<Login />} />  
          <Route path="/register" element={<Register />} />  
          <Route path="/korban" element={<KorbanList />} />  
          <Route path="/gunung" element={<GunungList />} />  
        </Routes>  
      </Router>  
    </Provider>  
  );  
};  
  
export default App;  
