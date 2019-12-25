import {combineReducers} from 'redux';

import search from './search-reducer'
import city from './city-reducer'
import favorites from './favorites-reducer'
export default combineReducers({
  search,
  city,
  favorites
  });