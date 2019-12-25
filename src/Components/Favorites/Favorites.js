import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getFavoritesData } from "../../js/actions/favorites";
import { TodayCard, DetailsToday} from "./FavoritesStyled";
import { removeFavorite, addToFavorite } from "../../js/actions/favorites";
import FavoriteCard from "../FavoriteCard/FavoriteCard";

const Favorites = ({ favorites }) => {
    return (
        <TodayCard>
            <h1>Favorites</h1>{
                favorites.favorites.length > 0 ? favorites.favorites.map((one) => (
                    <DetailsToday>
                        <FavoriteCard info={one} ></FavoriteCard>
                    </DetailsToday>
                )) : "No Favorites"}
        </TodayCard>
    );
};

Favorites.propTypes = {
    favorites: PropTypes.object.isRequired

};

const mapStateToProps = state => ({
    favorites: state.favorites
});

export default connect(mapStateToProps, { getFavoritesData, removeFavorite, addToFavorite })(Favorites);

