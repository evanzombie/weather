import React from "react";

const Today = props => (
	<div className="todayCard">
		<div className="flex" style={{ justifyContent: "space-between" }}>
			<div>
				<div className="cityName">{props.currentCity}</div>
				<div className="dateTime">{props.dt}</div>
			</div>
			<div style={{ fontSize: "4em", textAlign: "right" }}> Today </div>
		</div>
		<hr />
		<div className="flex mainFlex">
			<div className="leftCol">
				<div className="mainTemp">{props.temp}&deg;F</div>
				<div className="leftCol-2">
					<div className="mainWeather">{props.weather}</div>
					<div className="mainTempDiff">
						<div>{props.temp_max}&deg;</div>
						<div>{props.temp_min}&deg;</div>
					</div>
				</div>
			</div>

			<div className="rightCol flex ">
				<div className="description">{props.description}</div>
				<div className="pressure">Pressure: {props.pressure}</div>

				<div className="humidity">Humidity: {props.humidity}</div>

				<div className="speed">Wind: {props.wind}</div>

				<div className="all">Clouds: {props.clouds}</div>

				<div className="visibility">Visibility: {props.visibility}</div>
			</div>
		</div>
	</div>

	// <div className={`cityCard ${props.cols} ${props.color}`}>
	// 	<span className={`iconSize ${props.icon}`} />

	// 	<div className="temp">{props.temp} &#8457;</div>
	// 	<div className="weather">{props.weather} </div>

	// 	<div className={props.isFirst ? "showInfo" : "hideInfo"}>
	// 		<div className="temp_max">
	// 			{props.temp_min}&deg;F ~ {props.temp_max}&deg;F
	// 		</div>
	// 			<div className="humidity">Humidity: {props.humidity} </div>
	// 		<div className="wind">Wind: {props.wind} </div>
	// 	</div>

	// 	<div className="bottomRow">
	// 		<div>{props.city}</div>

	// 		<div>{props.country}</div>
	// 	</div>
	// </div>
);

export default Today;
