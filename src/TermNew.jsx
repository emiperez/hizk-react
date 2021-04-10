import React from "react";
import AsyncCreatableSelect from "react-select/async-creatable";
import config from "./config.json";

export default class TermNew extends React.Component {

	constructor(props) {
		super(props);
		this.timer = 0;
		this.state = { option: null, options: [] };
		this.handleOnChange = this.handleOnChange.bind(this);
	}

	handleOnChange(newValue) {
		if (newValue) {
			let term = {id: null, locale: this.props.locale, text: newValue.label}
			if (!newValue.__isNew__) {
				term.id = newValue.value;
			} 
			console.log("TermNew onChange: " + JSON.stringify(newValue));
			this.props.onChange(term);
			console.log("TermNew onChange2: " + JSON.stringify(newValue));
		}
	}

	loadOptions = (inputValue, callback) => {
		clearTimeout(this.timer);
		let url = config.apiUrl + "/terms/search/" + this.props.locale + "/?text=" + inputValue;
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
		return (<AsyncCreatableSelect
			placeholder="new Term"
			loadOptions={this.loadOptions}
			className="reactSelect"
			onChange={(newValue) => this.handleOnChange(newValue)}
			isClearable={true} />);
	};

	term2option = (term) => {
		if (term) {
			return ({ value: term.id, label: term.text })
		} else {
			return ({ value: -1, label: "" });
		}
	}

	processData = (terms) => {
		return terms.map(t => this.term2option(t));
	}

}