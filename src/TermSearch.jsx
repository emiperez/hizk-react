import React from "react";
import AsyncSelect from 'react-select/async';
import config from "./config.json";

export default class TermSearch extends React.Component {

	constructor(props) {
		super(props);
		this.timer = 0;
		console.log("TermSearch constructor: " + JSON.stringify(this.term2option(this.props.value)));
		let option = this.props.value || this.props.defaultValue;
		console.log("constructor option=" + JSON.stringify(option));
		if(!option || typeof option === "undefined") {
			option = {value: -1, label: "Not available"}
		} else {
			option = this.term2option(option);
		}
		console.log("constructor option2=" + JSON.stringify(option));
		this.state = { option: option, options: [option] };
	}		
	
	componentDidMount() {
		console.log("TermSearch did mount. id: " + this.props.id);
		console.log("this.state.option.id=" + this.state.option.id + "/this.props.id=" + this.props.id);	
		if (this.state.option.value === -1 && this.props.id) { 
			fetch(config.apiUrl + "/terms/" + this.props.id)
				.then(response => response.json())
				.then(data => {
					const option = this.term2option(data);
					this.setState({ option: option, options: [option] });
				});
		}
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

	loadOptions = (inputValue, callback) => {
		clearTimeout(this.timer);
		let url = config.apiUrl + "/terms/search/" + inputValue;
		if (typeof x !== "undefined") {
			url += "/" + this.props.locale;
		}
		this.timer = setTimeout(() => {
			fetch(url)
				.then(response => response.json())
				.then(data => {
					const terms = data;
					callback(this.processData(terms));
				});
		}, 500);
	};
	
	value() {
		return (this.state.value && {value: this.state.value.id, label: this.state.value.text});
	}

	render() {
		return <AsyncSelect
			name="search"			
			value={this.state.option}
			options={this.state.options}
			placeholder="search Term"
			loadOptions={this.loadOptions}
			onChange={(inputValue) => window.location = "/term/" + inputValue.value}
			className="reactSelect"
			isClearable={true}
		/>;
	}

}