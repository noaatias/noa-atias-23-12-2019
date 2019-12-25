import axios from "axios";
import { GET_CITY_DETAILS_LOADING, GET_CITY_DETAILS_SUCCESS, GET_CITY_DETAILS_FAILED, GET_FIVE_DAYS_MORE_LOADING, GET_FIVE_DAYS_MORE_SUCCESS, GET_FIVE_DAYS_MORE_FAILED } from "../constants/action-types";
const apiKey = "0vva2GlZR0NpwzgAjLIAZ3cfrvHxuq6X";
const baseUrl = "//dataservice.accuweather.com";

export const getLocationData = () => async dispatch => {
  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  async function success(pos) {
    var crd = pos.coords;
    try {
      const res = await axios.get(
        `${baseUrl}/locations/v1/cities/geoposition/search?apikey=${apiKey}&q=${crd.latitude}%2C${crd.longitude}&toplevel=true"`
      );

      dispatch(
        getCityDetails(
          res.data.LocalizedName,
          res.data.Key,
          res.data.Country.LocalizedName
        )
      );
    } catch (err) {
      const error = err;
      console.log(error)
    }
  }

  function error(err) {
    dispatch(getCityDetails("Tel Aviv","215854","Israel"));
  }

  navigator.geolocation.getCurrentPosition(success, error, options);
};

export const getCityDetails = (name, key, country) => async dispatch => {
  dispatch({ type: GET_CITY_DETAILS_LOADING });
  try {
    const res = await axios.get(
      `${baseUrl}/currentconditions/v1/${key}?apikey=${apiKey}`
    );

    dispatch({
      type: GET_CITY_DETAILS_SUCCESS,
      payload: { ...res.data[0], key, country, name }
    })
    dispatch(getFiveDaysMore(key))


  } catch (err) {
    dispatch({
      type: GET_CITY_DETAILS_FAILED
    });
  }
};

export const getFiveDaysMore = (key) => async dispatch => {
  dispatch({ type: GET_FIVE_DAYS_MORE_LOADING });
  try {
    const res = await axios.get(
      `${baseUrl}/forecasts/v1/daily/5day/${key}?apikey=${apiKey}&metric=true`
    );

    dispatch({
      type: GET_FIVE_DAYS_MORE_SUCCESS,
      payload: res.data.DailyForecasts
    });
  } catch (err) {
    dispatch({
      type: GET_FIVE_DAYS_MORE_FAILED
    });
  }
};