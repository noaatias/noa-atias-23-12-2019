import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Moment from "react-moment";

import { Card } from 'primereact/card';
import { ProgressSpinner } from 'primereact/progressspinner';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import { icons } from "../../Functions/Functions";
import { Information, FavoritesS, GeneralInformation, Temperature, TextTemperature, DateToday, Name, Country } from "./FavoriteCardStyled";
import { removeFavorite, addToFavorite, getFavoritesData } from "../../js/actions/favorites";
import { getCityDetails } from "../../js/actions/city";

const FavoriteCard = ({ favorites, removeFavorite, getFavoritesData, addToFavorite, info }) => {

    const [isFavorite, setIsFavorite] = useState(false);
    const [currentData, setCurrentData] = useState(null);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(favorites.loading)
    }, [favorites.loading])

    useEffect(() => {
        getFavoritesData(info).then((res) => {
            setCurrentData(res.payload)
        })

        if (favorites.favorites.find(city => city.key === info.key)) {
            setIsFavorite(true);
        }
        else {
            setIsFavorite(false)
        }
    }, [favorites.favorites])

    return (
        <>
            {currentData !== null && isFavorite && !loading ? 
        <Link 
            onClick={e => 
            {getCityDetails(currentData.name, currentData.key, currentData.country);}}
            to="/">
            <Card
            style={{ display: "flex", flexDirection: "row", alignItems: "center", flexFlow: "wrap", width: "500px" }}
            header={<img alt="Card" style={{ width: "200px" }} src={icons(currentData.data.WeatherIcon)} />}>
                 <Information>
                    <GeneralInformation>
                        <Name>
                            {currentData.name}
                        </Name>
                        <Country>
                            {currentData.country}
                        </Country>
                        <DateToday>
                            <Moment format="DD/MM/YYYY">{currentData.data.LocalObservationDateTime}</Moment>
                        </DateToday>
                    </GeneralInformation>
                    <FavoritesS>
                        <Temperature>
                            {Math.floor(currentData.data.Temperature.Metric.Value)}&deg;
                        </Temperature>
                        <TextTemperature>
                            {currentData.data.WeatherText}
                        </TextTemperature>
                    </FavoritesS>
                    <i
                        className={favorites.favorites.find(city => city.key === info.key) ?
                            "fas fa-star fa-2x": "far fa-star fa-2x"
                        }
                        onClick={e => {
                            isFavorite ? removeFavorite({ name: currentData.name, country: currentData.country, key: currentData.key }) : addToFavorite({ name: currentData.name, country: currentData.country, key: currentData.key });
                        }}
                        style={{ display: "flex", justifyContent: "flex-end" }}>
                    </i>
                </Information>
                </Card>
        </Link> : <ProgressSpinner />}
        </>
    );
};

FavoriteCard.propTypes = {
    favorites: PropTypes.object.isRequired,
    info: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    favorites: state.favorites
});

export default connect(mapStateToProps, { removeFavorite, addToFavorite, getFavoritesData })(FavoriteCard);

