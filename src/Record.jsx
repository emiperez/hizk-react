import React from "react";
import Translation from "./Translation";
import TranslationList from "./TranslationList";
import config from "./config.json";

export default class Record extends React.Component {
	constructor(props) {
		super(props);
		this.state = {latest: [], translation: null};
	}	
	
	componentDidMount() {		
		fetch(config.apiUrl + "/translations")
			.then(response => response.json())
			.then(data => this.setState({ latest: data }));
	}
	
	render() {
		return (
			<>
			<h1>New Translation</h1>
			<Translation mode="new" />
			<h2>Latest</h2>
			<TranslationList translations={this.state.latest} />
			</>
		);
	}
}