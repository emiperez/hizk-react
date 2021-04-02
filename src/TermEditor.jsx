import React from "react";
import { withRouter } from "react-router";
import DeleteButton from "./DeleteButton";
import TermSearch from "./TermSearch";
import TranslationList from "./TranslationList";
import config from "./config.json";

class TermEditor extends React.Component {
	constructor(props) {
		super(props);
		this.id = this.props.match.params.id;
		this.state = {translations: []};
	}
	
	handleSave() {
		console.log("Term Save");
	}
	
	handleDelete() {
		console.log("Term Delete");
	}
	
	componentDidMount() {
		console.log("TermEditor did Mount");	
		fetch(config.apiUrl + "/translations/?termId=" + this.id)
			.then(response => response.json())
			.then(data => this.setState({ translations: data }));
	}
	
	render() {
		return (
			<>
			<h1>Term editor</h1>
			<div ><TermSearch id={this.id} /><button onClick={() => this.handleSave()}>Save</button><DeleteButton  onClick={() => this.handleDelete()} /></div>
			<h2>Translations</h2>
			<TranslationList translations={this.state.translations} />
			</>
		);
	}
}

export default withRouter(TermEditor);