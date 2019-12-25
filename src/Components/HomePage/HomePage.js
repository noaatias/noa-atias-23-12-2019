import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { AutoComplete } from 'primereact/autocomplete';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import { SearchContainer, HomePageContainer, DetailsContainer } from "./HomePageStyled";
import MainWeatherCard from "../MainWeatherCard/MainWeatherCard";
import { getSearchCities } from "../../js/actions/search";
import store from "../../js/store";
import { getCityDetails } from "../../js/actions/city";

const HomePage = ({ search, city }) => {

  const [cityNew, setCity] = useState(null)
  const [chosenCity, setChosenCity] = useState(null);
  const [brandSuggestions, setBrandSuggestions] = useState(null)

  const suggestBrands = async () => {
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
      let results = search.cities.filter((city) => {
        return city.name.toLowerCase().startsWith(value.toLowerCase());
      });
      store.dispatch(getCityDetails(results[0].name, results[0].key, results[0].country));
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
        city.cityDetails ?
          <DetailsContainer>
            <MainWeatherCard key={city.cityDetails.key} name={chosenCity || city.cityDetails.name} country={search.cities[0] ? search.cities[0].country : city.cityDetails.country} />
          </DetailsContainer> : null
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
  city: state.city,
});

export default connect(mapStateToProps, {})(HomePage);