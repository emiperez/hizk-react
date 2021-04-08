import React from "react";
import config from "./config.json";

export default class TermEdit extends React.Component {

	constructor(props) {
		super(props);
		this.state = { term: this.props.value || this.props.defaultValue};
	}		
	
	componentDidMount() {
		console.log("TermEdit did mount. id: " + this.props.id);
		console.log("this.state.option.id=" + this.state.option.id + "/this.props.id=" + this.props.id);	
		if ( !this.state.term && this.props.id ) { 
			fetch(config.apiUrl + "/terms/" + this.props.id)
				.then(response => response.json())
				.then(data => this.setState({ term: data }));
		}
	}
	
	handleChange(newValue, actionMeta) {
		console.log("TermEdit.handleChange: " + JSON.stringify(newValue) + "/" + JSON.stringify(actionMeta));
		this.setState = {option: newValue, options: [newValue]};
		this.props.onChange(newValue);
	}

	render() {
		return (<AsyncCreatableSelect
			name="search"			
			value={this.state.option}
			options={this.state.options}
			placeholder="Edit Term"
			loadOptions={this.loadOptions}
			onChange={() => this.handleChange}
			className="reactSelect"
			isClearable
		/>);
	}

}