import React from "react";
import { useHistory } from 'react-router-dom';
import AsyncSelect from 'react-select/async';
import config from "./config.json";

export default class TermSearch extends React.Component {

	constructor(props) {
		super(props);
		this.timer = 0;
		this.handleChange = this.handleChange.bind(this);
	}
	
	handleChange(inputValue) {
		const path = "/term/" + inputValue.value;
		//const path = `${process.env.PUBLIC_URL}/hizk/term/${inputValue.value}`;
    	let history = useHistory();
		history.push(path);
	}

	loadOptions = (inputValue, callback) => {
		clearTimeout(this.timer);
		let url = config.apiUrl + "/terms/search/?text=" + inputValue;
		this.timer = setTimeout(() => {
			fetch(url)
				.then(response => response.json())
				.then(data => {
					const terms = data;
					callback(this.processData(terms));
				});
		}, 500);
	};

	render() {
		return <AsyncSelect
			name="search"
			placeholder="search Term"
			loadOptions={this.loadOptions}
			onChange={(inputValue) => window.location = `${document.baseURI}/term/${inputValue.value}`}
			className="reactSelect"
			isClearable={true}
		/>;
	}
	
	term2option = (term) => {
		if (term) {
			return ({value: term.id, label: term.locale + " - " + term.text})
		} else {
			return ({value: -1, label: "Not Available"});
		}
	}

	processData = (terms) => {
		return terms.map(t => this.term2option(t));
	}

}