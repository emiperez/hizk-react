import React from "react";
import config from "./config.json";

export default class LocaleSelect extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			locales: []
		};
	}

	componentDidMount() {
		fetch(config.apiUrl + "/terms/locales")
			.then(response => response.json())
			.then(data => this.setState({ locales: data }));
	}

	render() {
		const localeOptions = this.state.locales.map(locale => (
			<option key={locale} >{locale}</option>
		));
		return (
				<select id={this.props.id} 
					value={this.props.value || this.props.defaultValue} 
					onChange={this.props.onChange}>
					{localeOptions}
				</select>
		);
	}
}
