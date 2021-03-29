import React from "react";
import AsyncSelect from 'react-select/async';
import config from "./config.json";

export default class TermSearch extends React.Component {

	constructor(props) {
		super(props);
		this.timer = 0;
		this.state = { result: [], text: "" };
	}

	filterColors = (terms) => {
		let options = [];
		for (let t of terms) {
			options.push({
				value: t.id,
				label: t.locale + " / " + t.text
			});
		}
		return options;
	}

	loadOptions = (inputValue, callback) => {
		clearTimeout(this.timer);
		console.log("TIMER 1: " + this.timer);
		let url = config.apiUrl + "/terms/search/" + inputValue;
		console.log("URL: " + url);
		if (typeof x !== "undefined") {
			url += "/" + this.props.locale;
		}
		console.log("url: " + url + " / " + this.props.locale);
		this.timer = setTimeout(() => {
			fetch(url)
				.then(response => response.json())
				.then(data => {
					const terms = data;
					callback(this.filterColors(terms));
				});
		}, 500);
	};

	render() {
		return <AsyncSelect
			name="search"
			defaultValue={this.state.text}
			placeholder="search Term"
			loadOptions={this.loadOptions}
		/>;
	}
}