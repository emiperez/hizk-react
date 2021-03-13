import React from "react";
import config from "./config.json";

export default class LocaleSelect extends React.Component {
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
				<select id="level" value={this.props.defaultValue} onChange={this.props.onChange}>
					{levelOptions}
				</select>
			</div>
		);
	}
}
