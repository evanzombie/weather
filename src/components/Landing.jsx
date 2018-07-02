import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import Card from "./Card";

// Info from weather API
// const apiKey = "185be8b935f0b6a165216ace7b3d09da";
// new york:5128638
// London:2643743
// Berlin: 2950159
// Beijing:1816670
// mexico city: 3530597

class Landing extends Component {
	constructor(props) {
		super(props);

		this.state = {
			results: []
		};
	}

	componentDidMount() {
		this.fetchData();
	}

	colorPicker(temperature) {
		let colorPicked = "";

		if (temperature >= 80) {
			return (colorPicked = "sunny");
		} else if (temperature >= 70 && temperature < 80) {
			return (colorPicked = "clearSky");
		} else if (temperature >= 62 && temperature < 70) {
			return (colorPicked = "rain");
		} else {
			return (colorPicked = "mist");
		}
	}

	iconPicker(weather) {
		let iconPicked = "";

		if (weather.description.includes("cloud") || weather.description.includes("fog")) {
			return (iconPicked = "flaticon-cloud");
		} else if (weather.description.includes("thunderstorm")) {
			return (iconPicked = "flaticon-storm");
		} else if (weather.description.includes("rain")) {
			return (iconPicked = "flaticon-raining");
		} else {
			if (weather.icon == "01d") {
				return (iconPicked = "flaticon-sun");
			} else if (weather.icon == "01n") {
				return (iconPicked = "flaticon-moon");
			}
		}
	}

	fetchData() {
		fetch(
			"http://api.openweathermap.org/data/2.5/group?id=5128638,2643743,2950159,1816670,3530597&appid=185be8b935f0b6a165216ace7b3d09da&units=imperial"
		)
			.then(response => response.json())
			.then(data =>
				data.list.map(city => ({
					id: `${city.id}`,
					name: `${city.name}`,
					country: `${city.sys.country}`,
					weather: `${city.weather[0].main}`,
					description: `${city.weather[0].description.toUpperCase()}`,
					temp: `${Math.round(city.main.temp)}`,
					temp_max: `${Math.round(city.main.temp_max)}`,
					temp_min: `${Math.round(city.main.temp_min)}`,
					humidity: `${Math.round(city.main.humidity)}%`,
					wind: `${city.wind.speed} MPH`,
					color: `${this.colorPicker(Math.round(city.main.temp))}`,
					icon: `${this.iconPicker(city.weather[0])}`
				}))
			)
			.then(results =>
				this.setState({
					results
				})
			)
			.catch(error => console.log("fetching error: ", error));
	}

	render() {
		const results = this.state.results;

		return (
			<div className="centerArea  grid gridMain">
				{results.map((result, index) => {
					return (
						<Card
							key={result.id}
							cols={`col-${index + 1}`}
							temp={`${result.temp}`}
							weather={result.description}
							city={result.name}
							country={result.country}
							temp_max={result.temp_max}
							temp_min={result.temp_min}
							humidity={result.humidity}
							wind={result.wind}
							isFirst={index == 0 ? true : false}
							color={result.color}
							icon={result.icon}
						/>
					);
				})}
			</div>
		);
	}
}

export default Landing;
