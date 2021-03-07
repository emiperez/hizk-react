import React from "react";
import levels from "./levels.json";

export default class LevelSelect extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		const levelOptions = levels.map(level => (
			<option key={level}>{level}</option>
		));
		return (
			<select id="level" onChange={this.props.onChange}>
				{levelOptions}
			</select>
		);
	}
}