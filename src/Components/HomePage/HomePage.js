import React, { useState, useEffect } from "react";
import { Inp, Input, Label, Border, SearchContainer, HomePageContainer, DetailsContainer } from "./HomePageStyled";
import MainWeatherCard from "../MainWeatherCard/MainWeatherCard";
import { connect } from "react-redux";

import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { AutoComplete } from 'primereact/autocomplete';
import { getSearchCities } from "../../js/actions/search";
import store from "../../js/store";
import { getCityDetails, getFiveDaysMore } from "../../js/actions/city";
import PropTypes from "prop-types";

const HomePage = ({ search ,city}) => {
  const [cities, setCities] = useState(null)
  const [cityNew, setCity] = useState(null)
  const [chosenCity, setChosenCity] = useState(null);
  const [key, setKey] = useState(null);
  const [brandSuggestions, setBrandSuggestions] = useState(null)

  const suggestBrands =async () => {
    let newArr = [];
    search.cities.map((result) => {
      newArr.push(result.name);
    })
      setBrandSuggestions(newArr);
    
  }
  
  const searchForCity = async value => {
    if (value.length > 0) {
      store.dispatch(getSearchCities(value));
    }
  };

  const GetCityDetails = async (value) => {
  
    try {
      //   const res = await axios.get(
      //     `${baseUrl}/currentconditions/v1/${results[0].key}?apikey=${apiKey}`
      //   );
      let results = search.cities.filter((city) => {
        return city.name.toLowerCase().startsWith(value.toLowerCase());
      });
      console.log(results)
      setKey(results[0].key)
      store.dispatch(getCityDetails(results[0].name,results[0].key,results[0].country));
      // const res = [
      //   {
      //     "LocalObservationDateTime": "2019-12-23T08:27:00-05:00",
      //     "EpochTime": 1577107620,
      //     "WeatherText": "Mostly cloudy",
      //     "WeatherIcon": 6,
      //     "HasPrecipitation": false,
      //     "PrecipitationType": null,
      //     "IsDayTime": true,
      //     "Temperature": {
      //       "Metric": {
      //         "Value": 6.7,
      //         "Unit": "C",
      //         "UnitType": 17
      //       },
      //       "Imperial": {
      //         "Value": 44,
      //         "Unit": "F",
      //         "UnitType": 18
      //       }
      //     },
      //     "MobileLink": "http://m.accuweather.com/en/us/london-ky/40741/current-weather/333298?lang=en-us",
      //     "Link": "http://www.accuweather.com/en/us/london-ky/40741/current-weather/333298?lang=en-us"
      //   }
      // ]
      // console.log(res)

      //   let citiesData = [];
      //   res.data.map(city =>
      //     citiesData.push({
      //       name: city.LocalizedName,
      //       key: city.Key,
      //       country: city.Country.LocalizedName
      //     })
      //   );

      //   setCities(citiesData);
      // setCityDetails(res)
    } catch (err) {
      console.error(err);
    }
  };
  return (

    <HomePageContainer>
      <SearchContainer>
        <AutoComplete className="p-autocomplete" value={cityNew} placeholder="city name" onChange={(e) => { setCity(e.value); searchForCity(e.value) }}
          suggestions={brandSuggestions} onSelect={(e) => { setChosenCity(e.value); GetCityDetails(e.value) }} completeMethod={suggestBrands.bind(this)} />
      </SearchContainer>
      {
        city.cityDetails?
          <DetailsContainer>
            <MainWeatherCard key={city.cityDetails.key} name={chosenCity||city.cityDetails.name}  country={search.cities[0]?search.cities[0].country:city.cityDetails.country}/>
          </DetailsContainer> :null
      }


    </HomePageContainer>
  );
};

MainWeatherCard.propTypes = {
  city: PropTypes.object,
  search: PropTypes.object,
  

};

const mapStateToProps = state => ({
  search: state.search,
  city:state.city,
});

export default connect(mapStateToProps, {})(HomePage);


// const res={data:[
//     {
//       "Version": 1,
//       "Key": "328328",
//       "Type": "City",
//       "Rank": 10,
//       "LocalizedName": "London",
//       "Country": {
//         "ID": "GB",
//         "LocalizedName": "United Kingdom"
//       },
//       "AdministrativeArea": {
//         "ID": "LND",
//         "LocalizedName": "London"
//       }
//     },
//     {
//       "Version": 1,
//       "Key": "59411",
//       "Type": "City",
//       "Rank": 13,
//       "LocalizedName": "Loudi",
//       "Country": {
//         "ID": "CN",
//         "LocalizedName": "China"
//       },
//       "AdministrativeArea": {
//         "ID": "HN",
//         "LocalizedName": "Hunan"
//       }
//     },
//     {
//       "Version": 1,
//       "Key": "347625",
//       "Type": "City",
//       "Rank": 15,
//       "LocalizedName": "Los Angeles",
//       "Country": {
//         "ID": "US",
//         "LocalizedName": "United States"
//       },
//       "AdministrativeArea": {
//         "ID": "CA",
//         "LocalizedName": "California"
//       }
//     },
//     {
//       "Version": 1,
//       "Key": "319242",
//       "Type": "City",
//       "Rank": 20,
//       "LocalizedName": "Lome",
//       "Country": {
//         "ID": "TG",
//         "LocalizedName": "Togo"
//       },
//       "AdministrativeArea": {
//         "ID": "M",
//         "LocalizedName": "Maritime"
//       }
//     },
//     {
//       "Version": 1,
//       "Key": "57911",
//       "Type": "City",
//       "Rank": 23,
//       "LocalizedName": "Longyan",
//       "Country": {
//         "ID": "CN",
//         "LocalizedName": "China"
//       },
//       "AdministrativeArea": {
//         "ID": "FJ",
//         "LocalizedName": "Fujian"
//       }
//     },
//     {
//       "Version": 1,
//       "Key": "77666",
//       "Type": "City",
//       "Rank": 25,
//       "LocalizedName": "Longgang District",
//       "Country": {
//         "ID": "CN",
//         "LocalizedName": "China"
//       },
//       "AdministrativeArea": {
//         "ID": "GD",
//         "LocalizedName": "Guangdong"
//       }
//     },
//     {
//       "Version": 1,
//       "Key": "2580116",
//       "Type": "City",
//       "Rank": 25,
//       "LocalizedName": "Longhua District",
//       "Country": {
//         "ID": "CN",
//         "LocalizedName": "China"
//       },
//       "AdministrativeArea": {
//         "ID": "GD",
//         "LocalizedName": "Guangdong"
//       }
//     },
//     {
//       "Version": 1,
//       "Key": "2332564",
//       "Type": "City",
//       "Rank": 25,
//       "LocalizedName": "Longnan",
//       "Country": {
//         "ID": "CN",
//         "LocalizedName": "China"
//       },
//       "AdministrativeArea": {
//         "ID": "GS",
//         "LocalizedName": "Gansu"
//       }
//     },
//     {
//       "Version": 1,
//       "Key": "2332955",
//       "Type": "City",
//       "Rank": 25,
//       "LocalizedName": "Longhui County",
//       "Country": {
//         "ID": "CN",
//         "LocalizedName": "China"
//       },
//       "AdministrativeArea": {
//         "ID": "HN",
//         "LocalizedName": "Hunan"
//       }
//     },
//     {
//       "Version": 1,
//       "Key": "2333548",
//       "Type": "City",
//       "Rank": 25,
//       "LocalizedName": "Longyang District",
//       "Country": {
//         "ID": "CN",
//         "LocalizedName": "China"
//       },
//       "AdministrativeArea": {
//         "ID": "YN",
//         "LocalizedName": "Yunnan"
//       }
//     }
//   ]};