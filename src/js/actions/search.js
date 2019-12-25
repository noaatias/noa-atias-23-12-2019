import axios from "axios";
import { GET_SEARCH_CITIES_LOADING, GET_SEARCH_CITIES_SUCCESS, GET_SEARCH_CITIES_FAILED } from "../constants/action-types";
const apiKey = "0vva2GlZR0NpwzgAjLIAZ3cfrvHxuq6X";
const baseUrl = "//dataservice.accuweather.com";

export const getSearchCities = (value) => async dispatch => {
  dispatch({ type: GET_SEARCH_CITIES_LOADING });
  try {
    const res = await axios.get(
      `${baseUrl}/locations/v1/cities/autocomplete?apikey=${apiKey}&q=${value}`
    );
    let citiesData = [];
    res.data.map(city =>
      citiesData.push({
        name: city.LocalizedName,
        key: city.Key,
        country: city.Country.LocalizedName
      })
    );

    let results;
    results = citiesData.filter((city1) => {
      return city1.name.toLowerCase().startsWith(value.toLowerCase());
    });

    dispatch({
      type: GET_SEARCH_CITIES_SUCCESS,
      payload: results
    });
  } catch (err) {
    dispatch({
      type: GET_SEARCH_CITIES_FAILED
    });
  }
};
