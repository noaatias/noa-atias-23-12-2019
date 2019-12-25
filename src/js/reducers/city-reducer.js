import {
     GET_SEARCH_CITIES_LOADING, GET_SEARCH_CITIES_SUCCESS, GET_SEARCH_CITIES_FAILED, GET_CITY_DETAILS_LOADING, GET_CITY_DETAILS_FAILED, GET_CITY_DETAILS_SUCCESS, GET_FIVE_DAYS_MORE_LOADING, GET_FIVE_DAYS_MORE_FAILED, GET_FIVE_DAYS_MORE_SUCCESS
  } from "../constants/action-types";
  
  const initialState = {
    cityDetails: null,
    fiveDaysMore:[],
    loading: true,
    initState:null,
    error: {}
  };
  
  export default function(state = initialState, action) {
    const {type, payload} = action;
    switch (type) {
      case GET_CITY_DETAILS_LOADING:return {...state};
      case GET_CITY_DETAILS_FAILED:return {...state,error: payload,loading: false};
      case GET_CITY_DETAILS_SUCCESS:return {...state,cityDetails:payload,loading: false};
      case GET_FIVE_DAYS_MORE_LOADING:return {...state,loading: true};
      case GET_FIVE_DAYS_MORE_FAILED:return {...state,error: payload,loading: false};
      case GET_FIVE_DAYS_MORE_SUCCESS:return {...state,fiveDaysMore:payload,loading: false};
      
      default:
        return state;
    }
  }
  