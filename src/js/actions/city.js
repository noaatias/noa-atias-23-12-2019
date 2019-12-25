import axios from "axios";
import { GET_SEARCH_CITIES_LOADING, GET_SEARCH_CITIES_SUCCESS, GET_SEARCH_CITIES_FAILED, GET_CITY_DETAILS_LOADING, GET_CITY_DETAILS_SUCCESS, GET_CITY_DETAILS_FAILED, GET_FIVE_DAYS_MORE_LOADING, GET_FIVE_DAYS_MORE_SUCCESS, GET_FIVE_DAYS_MORE_FAILED } from "../constants/action-types";
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
console.log(error)    }
  }

  function error(err) {
    dispatch(getCityDetails("215854"));
  }

  navigator.geolocation.getCurrentPosition(success, error, options);
};
export const getCityDetails = (name,key,country) => async dispatch => {
  dispatch({type: GET_CITY_DETAILS_LOADING});
  try {
        const res = await axios.get(
          `${baseUrl}/currentconditions/v1/${key}?apikey=${apiKey}`
        );
//       let citiesData = [];
//       res.data.map(city =>
//         citiesData.push({
//           name: city.LocalizedName,
//           key: city.Key,
//           country: city.Country.LocalizedName
//         })
//       );

//       let results;
//       results = citiesData.filter((city1) => {
//         return city1.name.toLowerCase().startsWith(value.toLowerCase());
//       });

// console.log(results)
//       let newArr = [];
//       results.map((result) => {
//         newArr.push(result.name);
//       })
    dispatch({
      type: GET_CITY_DETAILS_SUCCESS,
      payload: {...res.data[0],key,country,name}
    })
      dispatch(getFiveDaysMore(key))

    
  } catch (err) {
    dispatch({
      type: GET_CITY_DETAILS_FAILED
    });
  }
};


//  const res = {data:[
//         {
//           "LocalObservationDateTime": "2019-12-23T08:27:00-05:00",
//           "EpochTime": 1577107620,
//           "WeatherText": "Mostly cloudy",
//           "WeatherIcon": 6,
//           "HasPrecipitation": false,
//           "PrecipitationType": null,
//           "IsDayTime": true,
//           "Temperature": {
//             "Metric": {
//               "Value": 6.7,
//               "Unit": "C",
//               "UnitType": 17
//             },
//             "Imperial": {
//               "Value": 44,
//               "Unit": "F",
//               "UnitType": 18
//             }
//           },
//           "MobileLink": "http://m.accuweather.com/en/us/london-ky/40741/current-weather/333298?lang=en-us",
//           "Link": "http://www.accuweather.com/en/us/london-ky/40741/current-weather/333298?lang=en-us"
//         }
//       ]}

      export const getFiveDaysMore = (key) => async dispatch => {
        dispatch({type: GET_FIVE_DAYS_MORE_LOADING});
        try {
              const res = await axios.get(
                `${baseUrl}/forecasts/v1/daily/5day/${key}?apikey=${apiKey}&metric=true`
              );
      //       let citiesData = [];
      //       res.data.map(city =>
      //         citiesData.push({
      //           name: city.LocalizedName,
      //           key: city.Key,
      //           country: city.Country.LocalizedName
      //         })
      //       );
      
      //       let results;
      //       results = citiesData.filter((city1) => {
      //         return city1.name.toLowerCase().startsWith(value.toLowerCase());
      //       });
      
      // console.log(results)
      //       let newArr = [];
      //       results.map((result) => {
      //         newArr.push(result.name);
      //       })
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
      // const res2={data:{DailyForecasts:[
      //   {
      //     "Date": "2019-12-24T07:00:00-05:00",
      //     "EpochDate": 1577188800,
      //     "Temperature": {
      //       "Minimum": {
      //         "Value": 3.3,
      //         "Unit": "C",
      //         "UnitType": 17
      //       },
      //       "Maximum": {
      //         "Value": 16.2,
      //         "Unit": "C",
      //         "UnitType": 17
      //       }
      //     },
      //     "Day": {
      //       "Icon": 1,
      //       "IconPhrase": "Sunny",
      //       "HasPrecipitation": false
      //     },
      //     "Night": {
      //       "Icon": 34,
      //       "IconPhrase": "Mostly clear",
      //       "HasPrecipitation": false
      //     },
      //     "Sources": [
      //       "AccuWeather"
      //     ],
      //     "MobileLink": "http://m.accuweather.com/en/us/london-ky/40741/daily-weather-forecast/333298?day=1&unit=c&lang=en-us",
      //     "Link": "http://www.accuweather.com/en/us/london-ky/40741/daily-weather-forecast/333298?day=1&unit=c&lang=en-us"
      //   },
      //   {
      //     "Date": "2019-12-25T07:00:00-05:00",
      //     "EpochDate": 1577275200,
      //     "Temperature": {
      //       "Minimum": {
      //         "Value": 5.2,
      //         "Unit": "C",
      //         "UnitType": 17
      //       },
      //       "Maximum": {
      //         "Value": 17.2,
      //         "Unit": "C",
      //         "UnitType": 17
      //       }
      //     },
      //     "Day": {
      //       "Icon": 4,
      //       "IconPhrase": "Intermittent clouds",
      //       "HasPrecipitation": false
      //     },
      //     "Night": {
      //       "Icon": 34,
      //       "IconPhrase": "Mostly clear",
      //       "HasPrecipitation": false
      //     },
      //     "Sources": [
      //       "AccuWeather"
      //     ],
      //     "MobileLink": "http://m.accuweather.com/en/us/london-ky/40741/daily-weather-forecast/333298?day=2&unit=c&lang=en-us",
      //     "Link": "http://www.accuweather.com/en/us/london-ky/40741/daily-weather-forecast/333298?day=2&unit=c&lang=en-us"
      //   },
      //   {
      //     "Date": "2019-12-26T07:00:00-05:00",
      //     "EpochDate": 1577361600,
      //     "Temperature": {
      //       "Minimum": {
      //         "Value": 8.4,
      //         "Unit": "C",
      //         "UnitType": 17
      //       },
      //       "Maximum": {
      //         "Value": 15.5,
      //         "Unit": "C",
      //         "UnitType": 17
      //       }
      //     },
      //     "Day": {
      //       "Icon": 6,
      //       "IconPhrase": "Mostly cloudy",
      //       "HasPrecipitation": false
      //     },
      //     "Night": {
      //       "Icon": 38,
      //       "IconPhrase": "Mostly cloudy",
      //       "HasPrecipitation": false
      //     },
      //     "Sources": [
      //       "AccuWeather"
      //     ],
      //     "MobileLink": "http://m.accuweather.com/en/us/london-ky/40741/daily-weather-forecast/333298?day=3&unit=c&lang=en-us",
      //     "Link": "http://www.accuweather.com/en/us/london-ky/40741/daily-weather-forecast/333298?day=3&unit=c&lang=en-us"
      //   },
      //   {
      //     "Date": "2019-12-27T07:00:00-05:00",
      //     "EpochDate": 1577448000,
      //     "Temperature": {
      //       "Minimum": {
      //         "Value": 8.7,
      //         "Unit": "C",
      //         "UnitType": 17
      //       },
      //       "Maximum": {
      //         "Value": 16.2,
      //         "Unit": "C",
      //         "UnitType": 17
      //       }
      //     },
      //     "Day": {
      //       "Icon": 7,
      //       "IconPhrase": "Cloudy",
      //       "HasPrecipitation": false
      //     },
      //     "Night": {
      //       "Icon": 36,
      //       "IconPhrase": "Intermittent clouds",
      //       "HasPrecipitation": false
      //     },
      //     "Sources": [
      //       "AccuWeather"
      //     ],
      //     "MobileLink": "http://m.accuweather.com/en/us/london-ky/40741/daily-weather-forecast/333298?day=4&unit=c&lang=en-us",
      //     "Link": "http://www.accuweather.com/en/us/london-ky/40741/daily-weather-forecast/333298?day=4&unit=c&lang=en-us"
      //   },
      //   {
      //     "Date": "2019-12-28T07:00:00-05:00",
      //     "EpochDate": 1577534400,
      //     "Temperature": {
      //       "Minimum": {
      //         "Value": 11.2,
      //         "Unit": "C",
      //         "UnitType": 17
      //       },
      //       "Maximum": {
      //         "Value": 17.2,
      //         "Unit": "C",
      //         "UnitType": 17
      //       }
      //     },
      //     "Day": {
      //       "Icon": 7,
      //       "IconPhrase": "Cloudy",
      //       "HasPrecipitation": false
      //     },
      //     "Night": {
      //       "Icon": 12,
      //       "IconPhrase": "Showers",
      //       "HasPrecipitation": true,
      //       "PrecipitationType": "Rain",
      //       "PrecipitationIntensity": "Light"
      //     },
      //     "Sources": [
      //       "AccuWeather"
      //     ],
      //     "MobileLink": "http://m.accuweather.com/en/us/london-ky/40741/daily-weather-forecast/333298?day=5&unit=c&lang=en-us",
      //     "Link": "http://www.accuweather.com/en/us/london-ky/40741/daily-weather-forecast/333298?day=5&unit=c&lang=en-us"
      //   }
      // ]}}