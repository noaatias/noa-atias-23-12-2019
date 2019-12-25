import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getFavoritesData } from "../../js/actions/favorites";
import { icons } from "../../Functions/Functions";
import { TodayCard, DetailsToday, Information, DetailsWeek,FavoritesS,GeneralInformation,Temperature,TextTemperature ,DateToday,Name, Country} from "./FavoritesStyled";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import Fade from 'react-reveal/Fade';
import Moment from "react-moment";
import { removeFavorite, addToFavorite } from "../../js/actions/favorites";
import FavoriteCard from "../FavoriteCard/FavoriteCard";

const Favorites = ({favorites,getFavoritesData,addToFavorite,removeFavorite}) => {
    const [show,setShow]=useState([]);

    const [allData,setAllData]=useState([]);
    const [isFavorite, setIsFavorite] = useState(false)
    const [loading, setLoading] = useState(false)


    useEffect(()=>{
        setShow(true)
    },[favorites.favorites])


    return (
        <TodayCard>
            <h1>Favorites</h1>{
        favorites.favorites.length>0?favorites.favorites.map((one)=>(
            <DetailsToday>
                
<FavoriteCard info={one} ></FavoriteCard>
</DetailsToday>
        )):"No Favorites"}
        </TodayCard>
        /* <>
         {allData?allData.map((one)=>(
            <Fade when={show}>
                    <Card 
                    style={{ display: "flex", flexDirection: "row",alignItems: "center",    flexFlow: "wrap" }}
                    header={<img alt="Card" style={{ width: "200px" }} src={icons(one.data.WeatherIcon)} />}>
                        <Information>
                            <GeneralInformation>
                                <Name>
                                {one.name}
                                </Name>
                                <Country>
                                {one.country}
                                </Country>
                                <DateToday>
                                    
                                    <Moment format="DD/MM/YYYY">{one.data.LocalObservationDateTime}</Moment>

                                </DateToday>
                            </GeneralInformation>
                        <Favorites>
                            <Temperature>
                                {one.data.Temperature.Metric.Value}&deg;
                            </Temperature>
                            <TextTemperature>
                                {one.data.WeatherText}
                            </TextTemperature>
                        </Favorites>
                        <i 
                        className={
                        isFavorite
                        ? "fas fa-star fa-2x"
                        : "far fa-star fa-2x"
                        }
                        onClick={e => {

                        isFavorite ? removeFavorite({name:one.name,country:one.country,key:one.key}) : addToFavorite({name:one.name,country:one.country,key:one.key});
                        }} 
                        style={{display: "flex",justifyContent: "flex-end"}}></i>

                        </Information>
                    </Card>
                    </Fade> 
        )):null} </> */
        
          /* <Fade when={show}>
                    <Card 
                    style={{ display: "flex", flexDirection: "row",alignItems: "center",    flexFlow: "wrap" }}
                    header={header}>
                        <Information>
                            <GeneralInformation>
                                <Name>
                                {name}
                                </Name>
                                <Country>
                                {country}
                                </Country>
                                <DateToday>
                                    
                                    <Moment format="DD/MM/YYYY">{city.cityDetails.LocalObservationDateTime}</Moment>

                                </DateToday>
                            </GeneralInformation>
                        <Favorites>
                            <Temperature>
                                {city.cityDetails.Temperature.Metric.Value}&deg;
                            </Temperature>
                            <TextTemperature>
                                {city.cityDetails.WeatherText}
                            </TextTemperature>
                        </Favorites>
                        <i 
                        className={
                        isFavorite
                        ? "fas fa-star fa-2x"
                        : "far fa-star fa-2x"
                        }
                        onClick={e => {

                            console.log(name)
                        isFavorite ? removeFavorite(name) : addToFavorite(name);
                        }} 
                        style={{display: "flex",justifyContent: "flex-end"}}></i>

                        </Information>
                    </Card>
                    </Fade> */
    );
};

Favorites.propTypes = {
    favorites:PropTypes.object.isRequired

};

const mapStateToProps = state => ({
    favorites:state.favorites
});

export default connect(mapStateToProps, {getFavoritesData,removeFavorite,addToFavorite})(Favorites);

