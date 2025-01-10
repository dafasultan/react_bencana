import React, { useState } from 'react';  
import { useDispatch } from 'react-redux';  
import { createGunung } from '../redux/action';
  
const GunungForm = () => {  
  const [name, setName] = useState('');  
  const [ketinggian, setKetinggian] = useState('');  
  const [lokasi, setLokasi] = useState('');  
  const dispatch = useDispatch();  
  
  const handleSubmit = (e) => {  
    e.preventDefault();  
    dispatch(createGunung({ name, ketinggian, lokasi }));  
    setName('');  
    setKetinggian('');  
    setLokasi('');  
  };  
  
  return (  
    <form onSubmit={handleSubmit}>  
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nama Gunung" required />  
      <input type="number" value={ketinggian} onChange={(e) => setKetinggian(e.target.value)} placeholder="Ketinggian (m)" required />  
      <input type="text" value={lokasi} onChange={(e) => setLokasi(e.target.value)} placeholder="Lokasi" required />  
      <button type="submit">Tambah Gunung</button>  
    </form>  
  );  
};  
  
export default GunungForm;  
