import {
     GET_SEARCH_CITIES_LOADING, GET_SEARCH_CITIES_SUCCESS, GET_SEARCH_CITIES_FAILED
  } from "../constants/action-types";
  
  const initialState = {
    cities: [],
    loading: true,
    error: {}
  };
  
  export default function(state = initialState, action) {
    const {type, payload} = action;
    switch (type) {
      case GET_SEARCH_CITIES_LOADING:return {...state};
      case GET_SEARCH_CITIES_FAILED:return {...state,error: payload,loading: false};
      case GET_SEARCH_CITIES_SUCCESS:return {...state,cities:payload};
      
      default:
        return state;
    }
  }
  