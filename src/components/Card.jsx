import React from "react";
import { Route } from "react-router-dom";

const Card = props => (
	<a href={`/${props.city.toLowerCase().replace(/\s+/g, "")}`} className={`cityCard ${props.cols} ${props.color}`}>
		<span className={`iconSize ${props.icon}`} />

		<div className="temp">{props.temp} &#8457;</div>
		<div className="weather">{props.weather} </div>

		<div className={props.isFirst ? "showInfo" : "hideInfo"}>
			<div className="temp_max">
				{props.temp_min}&deg;F ~ {props.temp_max}&deg;F
			</div>
			{/*<div className="temp_min">Min: {props.temp_min}&deg;F</div>*/}
			<div className="humidity">Humidity: {props.humidity} </div>
			<div className="wind">Wind: {props.wind} </div>
		</div>

		<div className="bottomRow">
			<div>{props.city}</div>

			<div>{props.country}</div>
		</div>
	</a>
);

export default Card;
