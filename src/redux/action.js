import axios from 'axios';  
  
// User Actions  
export const registerUser = (userData) => {  
  return async (dispatch) => {  
    const response = await axios.post('http://localhost:3000/api/register', userData);  
    // Handle response, e.g., store user data or show success message  
  };  
};  
  
export const loginUser = (credentials) => {
    return async (dispatch) => {
      try {
        // Mengirimkan kredensial untuk login ke server
        const response = await axios.post('http://localhost:3000/api/login', credentials); // URL lengkap
        
        // Mengambil token dari response
        const token = response.data.token;
        
        // Menyimpan token di localStorage untuk digunakan pada request berikutnya
        localStorage.setItem('authToken', token);
  
        // Mengirimkan token ke Redux store
        dispatch({ type: 'LOGIN', payload: token });
  
        // Optional: Redirect setelah login berhasil, jika perlu
        // history.push('/korban'); // pastikan menggunakan history untuk navigasi jika menggunakan React Router
  
      } catch (error) {
        console.error('Login failed:', error.response ? error.response.data.error : error.message);
  
        // Menangani error, Anda bisa mengatur state error atau menampilkan pesan kesalahan
        dispatch({ type: 'LOGIN_FAILURE', payload: error.response ? error.response.data.error : 'Login failed' });
      }
    };
  };
  
  
  
  
// Korban Actions  
export const setKorban = (korban) => ({  
  type: 'SET_KORBAN',  
  payload: korban,  
});  
  
export const addKorban = (korban) => ({  
  type: 'ADD_KORBAN',  
  payload: korban,  
});  
  
export const updateKorban = (korban) => ({  
  type: 'UPDATE_KORBAN',  
  payload: korban,  
});  
  
export const deleteKorban = (id) => ({  
  type: 'DELETE_KORBAN',  
  payload: id,  
});  
  
// API calls for korban  
export const fetchKorban = () => {
    return async (dispatch) => {
      const token = localStorage.getItem('authToken'); // Ambil token dari localStorage
  
      if (!token) {
        console.error('Token tidak ditemukan!');
        return;
      }
  
      try {
        // Menambahkan token ke dalam header Authorization
        const response = await axios.get('http://localhost:3000/api/korban', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
  
        dispatch(setKorban(response.data));
      } catch (error) {
        console.error('Error fetching korban:', error);
        // Tangani kesalahan sesuai dengan kebutuhan
      }
    };
  };
  
  
  export const createKorban = (korban) => {  
    return async (dispatch) => {  
      try {
        const token = localStorage.getItem('authToken'); // Ambil token dari localStorage
  
        if (!token) {
          console.error('Token tidak ditemukan!');
          return;
        }
  
        const response = await axios.post('http://localhost:3000/api/korban', korban, {
          headers: {
            'Authorization': `Bearer ${token}`, // Menambahkan token pada header
          },
        });  
  
        dispatch(addKorban(response.data));  
      } catch (error) {
        console.error('Error adding korban:', error);
        // Tangani kesalahan sesuai kebutuhan
      }
    };  
  };
  
export const editKorban = (korban) => {
    return async (dispatch) => {
      const token = localStorage.getItem('authToken'); // Ambil token dari localStorage
  
      if (!token) {
        console.error('Token tidak ditemukan!');
        return;
      }
  
      try {
        // Menambahkan token ke dalam header Authorization
        const response = await axios.put(
          `http://localhost:3000/api/korban/${korban.id}`,
          korban,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          }
        );
  
        dispatch(updateKorban(response.data)); // Mengupdate data korban setelah edit
      } catch (error) {
        console.error('Error editing korban:', error);
        // Tangani kesalahan sesuai dengan kebutuhan
      }
    };
  };
  
  
  export const removeKorban = (id) => {
    return async (dispatch) => {
      const token = localStorage.getItem('authToken'); // Ambil token dari localStorage
  
      if (!token) {
        console.error('Token tidak ditemukan!');
        return;
      }
  
      try {
        // Menambahkan token ke dalam header Authorization
        await axios.delete(`http://localhost:3000/api/korban/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
  
        dispatch(deleteKorban(id)); // Menghapus korban dari state setelah dihapus
      } catch (error) {
        console.error('Error deleting korban:', error);
        // Tangani kesalahan sesuai dengan kebutuhan
      }
    };
  };
  
  
// Gunung Actions  
export const setGunung = (gunung) => ({  
  type: 'SET_GUNUNG',  
  payload: gunung,  
});  
  
export const addGunung = (gunung) => ({  
  type: 'ADD_GUNUNG',  
  payload: gunung,  
});  
  
export const updateGunung = (gunung) => ({  
  type: 'UPDATE_GUNUNG',  
  payload: gunung,  
});  
  
export const deleteGunung = (id) => ({  
  type: 'DELETE_GUNUNG',  
  payload: id,  
});  
  
// API calls for gunung  
export const fetchGunung = () => {  
    return async (dispatch) => {  
      try {  
        const response = await axios.get('http://localhost:3000/api/gunung');  
        console.log("Data gunung:", response.data.data); // Log data yang diterima  
        dispatch(setGunung(response.data.data)); // Pastikan ini sesuai dengan struktur data  
      } catch (error) {  
        console.error("Error fetching gunung data:", error);  
      }  
    };  
  };  
   
  
export const createGunung = (gunung) => {  
  return async (dispatch) => {  
    const response = await axios.post('http://localhost:3000/api/gunung', gunung);  
    dispatch(addGunung(response.data));  
  };  
};  
  
export const editGunung = (gunung) => {
    return async (dispatch) => {
      try {
        const response = await axios.put(`http://localhost:3000/api/gunung/${gunung.id}`, gunung);
        
        // Dispatch updated gunung data to Redux store
        dispatch({
          type: 'UPDATE_GUNUNG',
          payload: response.data.data // Assuming the API responds with the updated gunung
        });
      } catch (error) {
        console.error('Error updating gunung:', error);
      }
    };
  };
  
  
export const removeGunung = (id) => {  
  return async (dispatch) => {  
    await axios.delete(`http://localhost:3000/api/gunung/${id}`);  
    dispatch(deleteGunung(id));  
  };  
};  
