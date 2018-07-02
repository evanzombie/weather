import React, { Component } from "react";

export default class Menu extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div
				className={`menuBtn ${this.props.hasCondition}`}
				onClick={event => {
					this.props.showToolBar(event);
				}}
				role="button"
			>
				<div className="bar1" />
				<div className="bar2" />
				<div className="bar3" />
			</div>
		);
	}
}
