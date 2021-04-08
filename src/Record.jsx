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
		this.loadTranslations();	
	}
	
	render() {
		return (
			<>
			<h1>New Translation</h1>
			<Translation mode="new" />
			<h2>Latest</h2>
			<TranslationList 
				translations={this.state.latest} 
				onDeleteTranslation={() => this.loadTranslations()}/>
			</>
		);
	}
	
	loadTranslations() {
		console.log("Record.loadTranslations");
		fetch(config.apiUrl + "/translations")
			.then(response => response.json())
			.then(data => this.setState({ latest: data }));		
	}
}