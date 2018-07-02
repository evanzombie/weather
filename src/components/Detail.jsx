import React, { Component } from "react";
import Today from "./Today";
import Forecast from "./Forecast";
import Menu from "./Menu";
import ToolBar from "./ToolBar";

const cities = {
	newyork: "5128638",
	london: "2643743",
	berlin: "2950159",
	beijing: "1816670",
	mexicocity: "3530597"
};

export default class Detail extends Component {
	constructor(props) {
		super(props);

		this.state = {
			toolBarClass: "toolBar",
			coverClass: "cover",
			hasCondition: "",
			cityName: this.props.city,
			results: [],
			forecasts: []
		};
		this.handleClick = this.handleClick.bind(this);
		this.fetchData = this.fetchData.bind(this);
		this.fetchForecast = this.fetchForecast.bind(this);
	}

	componentDidMount() {
		this.fetchData();
		this.fetchForecast();
	}

	componentWillMount() {
		document.getElementById("app").classList.add("sunnyClass");
		document.getElementById("app").classList.remove("app");
	}

	componentWillUnmount() {
		document.getElementById("app").classList.remove("sunnyClass");
		document.getElementById("app").classList.add("app");
	}

	handleClick(event) {
		event.preventDefault();

		if (this.state.toolBarClass === "toolBar") {
			this.setState({ toolBarClass: "toolBarShow" });
			this.setState({ coverClass: "coverShow" });
			this.setState({ hasCondition: "change" });
		} else {
			this.setState({ toolBarClass: "toolBar" });
			this.setState({ coverClass: "cover" });
			this.setState({ hasCondition: "" });
		}
	}

	convert = dt => {
		const unixtime = dt;

		// Months array
		const monthArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

		// Convert to milliseconds
		const date = new Date(unixtime * 1000);
		const year = date.getFullYear();
		const month = monthArr[date.getMonth()];
		const day = date.getDate();

		const dateTime = month + " " + day;
		return dateTime;
	};

	colorPicker = temperature => {
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
	};

	iconPicker = weather => {
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
	};

	getCityID = () => {
		const currentCity = this.state.cityName;
		let cityID = "";
		switch (currentCity) {
			case "newyork":
				return (cityID = "5128638");
				break;
			case "london":
				return (cityID = "2643743");
				break;
			case "beijing":
				return (cityID = "1816670");
				break;
			case "mexicocity":
				return (cityID = "3530597");
				break;
			case "berlin":
				return (cityID = "2950159");
				break;
			default:
				console.log(cityID);
		}
	};
	fetchForecast = () => {
		fetch(
			`http://api.openweathermap.org/data/2.5/forecast?id=${
				cities.hasOwnProperty(this.props.city) ? this.getCityID() : ""
			}&appid=185be8b935f0b6a165216ace7b3d09da&units=imperial&cnt=4`
		)
			.then(response => response.json())
			.then(data =>
				data.list.map(forecast => ({
					id: forecast.dt,
					// dt: `${this.convert(forecast.dt)}`,
					// dt: `${this.convert(forecast.dt + 86400)}`,
					dt: Date.now() / 1000 + 86400,
					weather: `${forecast.weather[0].main}`,
					description: `${forecast.weather[0].description.toUpperCase()}`,
					temp: `${forecast.main.temp}`,
					temp_max: `${forecast.main.temp_max}`,
					temp_min: `${forecast.main.temp_min}`,
					humidity: `${forecast.main.humidity}%`,
					wind: `${forecast.wind.speed} MPH`,
					color: `${this.colorPicker(Math.round(forecast.main.temp))}`
				}))
			)
			.then(forecasts =>
				this.setState({
					forecasts
				})
			)
			.catch(error => console.log("fetching error: ", error));
	};

	fetchData = () => {
		fetch(
			`http://api.openweathermap.org/data/2.5/group?id=${
				cities.hasOwnProperty(this.props.city) ? this.getCityID() : ""
			}
			&appid=185be8b935f0b6a165216ace7b3d09da&units=imperial`
		)
			.then(response => response.json())
			.then(data =>
				data.list.map(city => ({
					id: `${city.id}`,
					dt: `${this.convert(city.dt)}`,
					name: `${city.name}`,
					country: `${city.sys.country}`,
					weather: `${city.weather[0].main}`,
					description: `${city.weather[0].description.toUpperCase()}`,
					temp: `${Math.round(city.main.temp)}`,
					temp_max: `${city.main.temp_max}`,
					temp_min: `${city.main.temp_min}`,
					humidity: `${Math.round(city.main.humidity)}%`,
					wind: `${city.wind.speed} MPH`,
					pressure: `${city.main.pressure} hPa`,
					clouds: `${city.clouds.all}%`,
					visibility: `${Math.round(city.visibility / 1609.344)} miles`,
					color: `${this.colorPicker(Math.round(city.main.temp))}`,
					icon: `${this.iconPicker(city.weather[0])}`
				}))
			)
			.then(console.log("results"))
			.then(results =>
				this.setState({
					results
				})
			)
			.catch(error => console.log("fetching error: ", error));
	};
	render() {
		const results = this.state.results;
		const forecasts = this.state.forecasts;

		console.log(forecasts);

		return (
			<div className="detail">
				<Menu showToolBar={this.handleClick} hasCondition={this.state.hasCondition} />

				<div className={this.state.toolBarClass}>
					<ToolBar />
				</div>
				<div onClick={this.handleClick} role="button" className={this.state.coverClass} />
				{results.map(result => {
					return (
						<Today
							key={result.id}
							dt={result.dt}
							currentCity={result.name}
							temp={result.temp}
							weather={result.weather}
							temp_max={result.temp_max}
							temp_min={result.temp_min}
							description={result.description}
							humidity={result.humidity}
							wind={result.wind}
							visibility={result.visibility}
							clouds={result.clouds}
							pressure={result.pressure}
						/>
					);
				})}

				<div className="forecast">
					{forecasts.map((forecast, index) => {
						return (
							<Forecast
								key={forecast.id}
								date={index == 0 ? "Tomorrow" : this.convert(forecast.dt + 86400 * index)}
								weather={forecast.description}
								temp={forecast.temp}
								humidity={forecast.humidity}
								wind={forecast.wind}
								max={forecast.temp_max}
								min={forecast.temp_min}
								color={forecast.color}
							/>
						);
					})}
				</div>
			</div>
		);
	}
}
