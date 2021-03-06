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
				<select 
					ref={(s) => this.select = s}
					value={this.props.value || this.props.defaultValue || "A1"}
					onChange={this.props.onChange}>
					{levelOptions}
				</select>
		);
	}
}
