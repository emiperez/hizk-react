import React from "react";
import AsyncCreatableSelect from "react-select/async-creatable";
import config from "./config.json";

export default class TermNew extends React.Component {	

	constructor(props) {
		super(props);
		this.timer = 0;
		this.state = { option: null, options: [] };
	}

	term2option = (term) => {
		if (term) {
			return ({value: term.id, label: term.locale + " - " + term.text})
		} else {
			return ({value: -1, label: "larala"});
		}
	}

	processData = (terms) => {
		return terms.map(t => this.term2option(t));
	}

	loadOptions = (inputValue, callback) => {
		clearTimeout(this.timer);
		let url = config.apiUrl + "/terms/search/" + inputValue + "/" + this.props.value.locale;
		this.timer = setTimeout(() => {
			fetch(url)
				.then(response => response.json())
				.then(data => {
					const terms = data;
					callback(this.processData(terms));
				});
		}, 500);
	};
	
	value = () => {
		return (this.state.value && {value: this.state.value.id, label: this.state.value.text});
	}
	
	render() { 
			return (<AsyncCreatableSelect
			value={this.state.option}
			options={this.state.options}
			placeholder="search Term"
			loadOptions={this.loadOptions}
			onChange={(inputValue) => console.log("TermNew value: " + JSON.stringify(inputValue))}
			className="reactSelect"
			isClearable={true}/>);
	};

}