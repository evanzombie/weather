import React from "react";

const Forecast = props => (
	<div style={{ boxShadow: "5px 5px 14px black" }} className={` detailCard ${props.color} `}>
		<div className="forecastDate">{props.date}</div>
		<div className="temp">{props.temp} &deg;F</div>
		<div className="weather"> {props.weather} </div>

		<div>
			<div className="temp_max">
				{props.min}&deg;F ~ {props.max}&deg;F
			</div>
			<div className="humidity">Humidity: {props.humidity} </div>
			<div className="wind">Wind speed: {props.wind} </div>
		</div>
	</div>
);

export default Forecast;
