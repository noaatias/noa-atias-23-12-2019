import React, { useState, useEffect } from "react";
import { TodayCard, DetailsToday, Information, Favorites, DetailsWeek,GeneralInformation,Temperature,TextTemperature ,DateToday,Name, Country} from "./MainWeatherCardStyled";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import Fade from 'react-reveal/Fade';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import FiveDaysWeather from "../FiveDaysWeather/FiveDaysWeather";
import Moment from "react-moment";
import {icons} from "../../Functions/Functions"
import { removeFavorite, addToFavorite } from "../../js/actions/favorites";
import {ProgressSpinner} from 'primereact/progressspinner';
import ToggleButton from 'react-toggle-button'

const MainWeatherCard = ({ city ,key,cityDetails,name,country,search,favorites,addToFavorite,removeFavorite}) => {

    const [show, setShow] = useState(false)
    const [icon, setIcon] = useState(null)
    const [flip, setFlip] = useState(false)
    const [isFavorite, setIsFavorite] = useState(false)
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState(false);
console.log(key)
    useEffect(()=>{
setLoading(city.loading)
    },[city.loading])
    useEffect(() => {
        setShow(true);
        if(cityDetails){
            
            setIcon(icons(cityDetails.WeatherIcon));
            if (favorites.favorites.find(city => city.key === cityDetails.key)) {
                setIsFavorite(true);
            }
            else{
                setIsFavorite(false)
            }
        }
       
    })
 
    const header = <img alt="Card" style={{ width: "200px" }} src={icon} />;
    return (
<>{loading?<ProgressSpinner/>
:
        <TodayCard>
       <div style={{    display: "flex"}}> <div style={{marginRight:"5px"}}>change to F</div><ToggleButton
  value={ value || false }
  onToggle={(value) => {
    setValue(!value)
  }} /></div>
            <DetailsToday>
                {cityDetails!==null?
                <Fade when={show}>
                    <Card 
                    style={{ display: "flex", flexDirection: "row",alignItems: "center",    flexFlow: "wrap" }}
                    header={header}>
                        <Information>
                            <GeneralInformation>
                                <Name>
                                {city.cityDetails.name}
                                </Name>
                                <Country>
                                {city.cityDetails.country}
                                </Country>
                                <DateToday>
                                    
                                    <Moment format="DD/MM/YYYY">{city.cityDetails.LocalObservationDateTime}</Moment>

                                </DateToday>
                            </GeneralInformation>
                        <Favorites>
                            <Temperature>
                                {value?Math.round(city.cityDetails.Temperature.Imperial.Value)+"F":Math.round(city.cityDetails.Temperature.Metric.Value)+"C"}&deg;
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
                        isFavorite ? removeFavorite({name:name,country:country,key:city.cityDetails.key}) : addToFavorite({name:name,country:country,key:city.cityDetails.key});
                        }} 
                        style={{display: "flex",justifyContent: "flex-end"}}></i>

                        </Information>
                    </Card>
                </Fade>:null}
            </DetailsToday>
            <Fade when={show}>
            <Button style={{maxWidth:"260px",alignSelf: "center"}}label="Click to night/morning weather" icon="pi pi-check" onClick={()=>setFlip(!flip) }/>
            </Fade>
                
            <DetailsWeek>
                
               <FiveDaysWeather key={key} units={value} flip={flip}/>
            </DetailsWeek>
        </TodayCard>
        }
        </>

    ) ;
};
MainWeatherCard.propTypes = {
    city: PropTypes.object.isRequired,
    cityDetails: PropTypes.object.isRequired,
    search: PropTypes.object.isRequired,
    name:PropTypes.string.isRequired,
    country:PropTypes.string.isRequired,
    key:PropTypes.string.isRequired,
    favorites:PropTypes.object.isRequired

};

const mapStateToProps = state => ({
    city: state.city,
    cityDetails: state.city.cityDetails,

    favorites:state.favorites,
    search:state.search
});

export default connect(mapStateToProps, {addToFavorite,removeFavorite})(MainWeatherCard);

