import { createStore, applyMiddleware } from 'redux';  
import { Provider } from 'react-redux';  
import { thunk } from 'redux-thunk'; // Ubah ini menjadi named import  
import rootReducer from '../redux/reducer'; // Pastikan path ini benar  
  
const store = createStore(rootReducer, applyMiddleware(thunk));  
  
export default store;  
