import React from "react";
import config from "./config.json";

export default class LevelSelect extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			levels: []
		};
	}

	componentDidMount() {
		fetch(config.apiUrl + "/translations/levels")
			.then(response => response.json())
			.then(data => this.setState({ levels: data }));
	}

	render() {
		const levelOptions = this.state.levels.map(level => (
			<option key={level}>{level}</option>
		));
		return (
			<div>
				<select id="level" onChange={this.props.onChange}>
					{levelOptions}
				</select>
			</div>
		);
	}
}
