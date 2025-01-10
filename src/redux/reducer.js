import { combineReducers } from 'redux';  
  
const initialState = {  
  korban: [],  
  gunung: [],  
  user: null,  
};  
  
const korbanReducer = (state = initialState.korban, action) => {  
  switch (action.type) {  
    case 'SET_KORBAN':  
      return action.payload;  
    case 'ADD_KORBAN':  
      return [...state, action.payload];  
    case 'UPDATE_KORBAN':  
      return state.map(korban =>   
        korban.id === action.payload.id ? action.payload : korban  
      );  
    case 'DELETE_KORBAN':  
      return state.filter(korban => korban.id !== action.payload);  
    default:  
      return state;  
  }  
};  
  
  
const gunungReducer = (state = initialState.gunung, action) => {  
  switch (action.type) {  
    case 'SET_GUNUNG':  
      return action.payload; // Mengatur data gunung dari API  
    case 'ADD_GUNUNG':  
      return [...state, action.payload];  
    case 'UPDATE_GUNUNG':  
      return state.map(gunung =>   
        gunung.id === action.payload.id ? action.payload : gunung  
      );  
    case 'DELETE_GUNUNG':  
      return state.filter(gunung => gunung.id !== action.payload);  
    default:  
      return state;  
  }  
};
  
const userReducer = (state = initialState.user, action) => {  
  switch (action.type) {  
    case 'LOGIN':  
      return action.payload;  
    case 'LOGOUT':  
      return null;  
    default:  
      return state;  
  }  
};  
  
export default combineReducers({  
  korban: korbanReducer,  
  gunung: gunungReducer,  
  user: userReducer,  
});  
