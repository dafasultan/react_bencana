import React, { useState } from 'react';  
import { useDispatch } from 'react-redux';  
import { createKorban } from '../redux/action';  
  
const KorbanForm = () => {  
  const [name, setName] = useState('');  
  const [alamat, setAlamat] = useState('');  
  const [kondisi, setKondisi] = useState('');  
  const [nama_pos, setNamaPos] = useState('');  
  const dispatch = useDispatch();  
  
  const handleSubmit = (e) => {  
    e.preventDefault();  
    dispatch(createKorban({ name, alamat, kondisi, nama_pos }));  
    setName('');  
    setAlamat('');  
    setKondisi('');  
    setNamaPos('');  
  };  
  
  return (  
    <form onSubmit={handleSubmit}>  
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nama Korban" required />  
      <input type="text" value={alamat} onChange={(e) => setAlamat(e.target.value)} placeholder="Alamat" required />  
      <input type="text" value={kondisi} onChange={(e) => setKondisi(e.target.value)} placeholder="Kondisi" required />  
      <input type="text" value={nama_pos} onChange={(e) => setNamaPos(e.target.value)} placeholder="Nama Pos" required />  
      <button type="submit">Tambah Korban</button>  
    </form>  
  );  
};  
  
export default KorbanForm;  
