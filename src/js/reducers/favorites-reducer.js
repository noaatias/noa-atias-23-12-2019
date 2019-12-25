import { ADD_FAVORITE, REMOVE_FAVORITE, GET_FAVORITES_DATA_LOADING, GET_FAVORITES_DATA_SUCCESS, GET_FAVORITES_DATA_FAILED } from "../constants/action-types";

  
  const initialState = {
    favorites: [],
    data:null,
    loading: true,
    error: {}
  };
  
  export default function(state = initialState, action) {
    const {type, payload} = action;
    switch (type) {
      case ADD_FAVORITE:return {...state,favorites:[...state.favorites, payload]};
      case REMOVE_FAVORITE:return {...state,favorites: state.favorites.filter(city => city.key !== payload.key)};
      case GET_FAVORITES_DATA_LOADING:return {...state,loading:true};
      case GET_FAVORITES_DATA_SUCCESS:return {...state,data:payload,loading:false};
      case GET_FAVORITES_DATA_FAILED:return {...state,error:payload,loading:false};

      default:
        return state;
    }
  }
  