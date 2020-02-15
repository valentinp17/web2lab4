import React from 'react';
import LocationWeatherInfo from "./LocationWeatherInfo";
import DeleteCity from "./DeleteCity";
import AddCity from "./AddCity";
import {connect} from "react-redux";
import {addCity} from "../actions/AddCity";
import {deleteCityFromServer} from "../actions/DeleteCity";
import {fetchCities} from "../actions/FetchCity";
import '../styles/CityList.css'

function mapDispatchToProps(dispatch) {
    return {
        addCity: city => dispatch(addCity(city)),
        deleteCity: city => dispatch(deleteCityFromServer(city)),
        fetchCities: () => dispatch(fetchCities())
    };
}

function mapStateToProps(state) {
    return {cities: state.cities};
};

class ConnectedCityList extends React.Component {


    addCity = (cityName) => {
        const timeAdded = Date.now();
        this.props.addCity({
            name: cityName,
            timeAdded: timeAdded
        });
    }

      removeCity = (city) => {
        this.props.deleteCity(city);
    }

    fetchCities = () => {
        console.log('dispatching fetchCities action...');
        this.props.fetchCities();
    }

    formatCities = (cities) => {
        return cities.map((city) => {
            return <li key={city.timeAdded}>
                    <LocationWeatherInfo city={city}/>
                    <DeleteCity city={city} removeCity={this.removeCity}/>
                </li>
            }
        );
    };

    componentDidMount() {
        console.log('mounted, fetching cities...');
       this.fetchCities();
    }


    render() {
        return (
            <div>
                <AddCity addCity={this.addCity}/>
                <ul id="city-grid">{this.formatCities(this.props.cities)}</ul>
            </div>

        );
    }
}

const CityList = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectedCityList);

export default CityList
