import React from "react";
import TranslationList from "./TranslationList";
import config from "./config.json";

export default class Record extends React.Component {
	constructor(props) {
		super(props);
		this.state = {latest: []};
	}	
	
	componentDidMount() {		
		fetch(config.apiUrl + "/translations")
			.then(response => response.json())
			.then(data => this.setState({ latest: data }));
	}
	
	render() {
		return (
			<>
			<h2>Latest</h2>
			<TranslationList translations={this.state.latest} />
			</>
		);
	}
}