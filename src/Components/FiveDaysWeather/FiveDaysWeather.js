import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Fade from 'react-reveal/Fade';
import ReactCardFlip from 'react-card-flip';

import { Card } from 'primereact/card';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import { Details, Temperature, Text } from "./FiveDaysWeatherStyled";
import { icons, EpochDateToName, convertToFahrenheit } from "../../Functions/Functions"
import { getFiveDaysMore } from "../../js/actions/city";

const FiveDaysWeather = ({ city, flip, units, key }) => {

    const { fiveDaysMore } = city;

    const [showAll, setShowAll] = useState(false);
    const [unitsNew, setUnits] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowAll(true)
        }, 500);
        return () => clearTimeout(timer);
    })

    useEffect(() => {
        setUnits(units)
        if (units !== unitsNew) {
            getFiveDaysMore(key)
        }
    }, [units])

    return (fiveDaysMore ? (
        <>
            {fiveDaysMore.map((oneDay) => (
                <Fade key={oneDay.EpochDate} when={showAll}>
                    <ReactCardFlip isFlipped={flip} flipDirection="horizontal">
                        <Card
                            key={oneDay.EpochDate}
                            header={<img alt="Card" src={icons(oneDay.Day.Icon)} />}
                            title={EpochDateToName(oneDay.EpochDate)}
                            style={{ display: "flex", flexDirection: "column", width: "200px", margin: "10px", height: "280px" }}
                        >
                            <Details>
                                <Temperature>
                                    {!unitsNew ? Math.round(oneDay.Temperature.Minimum.Value) + "C" : Math.round(convertToFahrenheit(oneDay.Temperature.Minimum.Value)) + "F"}&deg;-{!unitsNew ? Math.round(oneDay.Temperature.Maximum.Value) + oneDay.Temperature.Maximum.Unit : Math.round(convertToFahrenheit(oneDay.Temperature.Maximum.Value)) + "F"}&deg;
                                </Temperature>
                                <Text>
                                    {oneDay.Day.IconPhrase}
                                </Text>
                            </Details>
                        </Card>
                        <Card
                            key={oneDay.EpochDate}
                            header={<img alt="Card" src={icons(oneDay.Night.Icon)} />}
                            title={EpochDateToName(oneDay.EpochDate)}
                            style={{ display: "flex", flexDirection: "column", width: "200px", margin: "10px", color: "white", background: "black", height: "280px" }}>
                            <Details>
                                <Temperature>
                                    {!unitsNew ? Math.round(oneDay.Temperature.Minimum.Value) + "C" : Math.round(convertToFahrenheit(oneDay.Temperature.Minimum.Value)) + "F"}&deg;-{!unitsNew ? Math.round(oneDay.Temperature.Maximum.Value) + oneDay.Temperature.Maximum.Unit : Math.round(convertToFahrenheit(oneDay.Temperature.Maximum.Value)) + "F"}&deg;
                                </Temperature>
                                <Text>
                                    {oneDay.Night.IconPhrase}
                                </Text>
                            </Details>
                        </Card>
                    </ReactCardFlip>
                </Fade>
            ))}
        </>
    ) : null);
};

FiveDaysWeather.propTypes = {
    city: PropTypes.object.isRequired,
    flip: PropTypes.bool.isRequired,
    units: PropTypes.bool.isRequired,
    key: PropTypes.string,


};

const mapStateToProps = state => ({
    city: state.city,
});

export default connect(mapStateToProps, {})(FiveDaysWeather);

