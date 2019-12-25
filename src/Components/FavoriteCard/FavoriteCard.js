import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { icons } from "../../Functions/Functions";
import { TodayCard, DetailsToday, Information, DetailsWeek,FavoritesS,GeneralInformation,Temperature,TextTemperature ,DateToday,Name, Country} from "./FavoriteCardStyled";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import Fade from 'react-reveal/Fade';
import Moment from "react-moment";
import { removeFavorite, addToFavorite,getFavoritesData } from "../../js/actions/favorites";
import {ProgressSpinner} from 'primereact/progressspinner';

const FavoriteCard = ({dispatch,favorites,removeFavorite,getFavoritesData,addToFavorite,info}) => {
    const [show,setShow]=useState([]);
    const [isFavorite,setIsFavorite]=useState(false);
    const [currentData,setCurrentData]=useState(null);
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        setLoading(favorites.loading)
    },[favorites.loading])

console.log(info)
    useEffect(()=>{
        
    getFavoritesData(info).then((res)=>{
    console.log(res);
    setCurrentData(res.payload)
})       
        if (favorites.favorites.find(city => city.key === info.key)) {
            setIsFavorite(true);
        }
        else{
            setIsFavorite(false)
        }
        

    },[favorites.favorites])

console.log(currentData)
    return (
        <>
{currentData!==null&&isFavorite&&!loading?<Card 
                    style={{ display: "flex", flexDirection: "row",alignItems: "center",    flexFlow: "wrap" }}
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
                                { Math.floor(currentData.data.Temperature.Metric.Value)}&deg;
                            </Temperature>
                            <TextTemperature>
                                {currentData.data.WeatherText}
                            </TextTemperature>
                        </FavoritesS>
                        <i 
                        className={
                            favorites.favorites.find(city => city.key === info.key )? 
                            "fas fa-star fa-2x"
                        : "far fa-star fa-2x"
                        }
                        onClick={e => {
                        isFavorite ? removeFavorite({name:currentData.name,country:currentData.country,key:currentData.key}) : addToFavorite({name:currentData.name,country:currentData.country,key:currentData.key});
                        }} 
                        style={{display: "flex",justifyContent: "flex-end"}}></i>

                        </Information>
                    </Card>:<ProgressSpinner/>}
        
        </>
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

FavoriteCard.propTypes = {
    favorites:PropTypes.object.isRequired,
    info:PropTypes.object.isRequired,


};

const mapStateToProps = state => ({
    favorites:state.favorites
});

export default connect(mapStateToProps, {removeFavorite,addToFavorite,getFavoritesData})(FavoriteCard);

