import axios from "axios";
import { ADD_FAVORITE, REMOVE_FAVORITE, GET_FAVORITES_DATA_LOADING, GET_FAVORITES_DATA_SUCCESS, GET_FAVORITES_DATA_FAILED } from "../constants/action-types";
const apiKey = "0vva2GlZR0NpwzgAjLIAZ3cfrvHxuq6X";
const baseUrl = "//dataservice.accuweather.com";

export const addToFavorite = city => dispatch => {
  try {
    dispatch({
      type: ADD_FAVORITE,
      payload: city
    });
  } catch (err) {
    console.error(err);
  }
};

export const removeFavorite = city => dispatch => {
  try {

    dispatch({
      type: REMOVE_FAVORITE,
      payload: city
    });
  } catch (err) {
    console.error(err);
  }
};

export const getFavoritesData = (favorite) => async dispatch => {

  dispatch({ type: GET_FAVORITES_DATA_LOADING })
  try {
    const res = await axios.get(
      `${baseUrl}/currentconditions/v1/${favorite.key}?apikey=${apiKey}`
    );
    const city = {
      data: res.data[0],
      name: favorite.name,
      key: favorite.key,
      country: favorite.country.country
    };
    return dispatch({
      type: GET_FAVORITES_DATA_SUCCESS,
      payload: city
    });
  } catch (err) {
    return dispatch({
      type: GET_FAVORITES_DATA_FAILED,
      payload: err
    });
  }
};
