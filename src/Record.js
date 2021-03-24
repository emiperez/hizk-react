import React from "react";
import Translation from "./Translation";
import config from "./config.json";

export default class Record extends React.Component {
	constructor(props) {
		super(props);
		this.state = {latest: []};
		this.handleDeleteTranslation = this.handleDeleteTranslation.bind(this);
	}	
	
	componentDidMount() {		
		fetch(config.apiUrl + "/translations")
			.then(response => response.json())
			.then(data => this.setState({ latest: data }));
	}
	
	handleDeleteTranslation(translation) {
		const filteredLatest = this.state.latest.filter(tr => (
			tr.origin.id !== translation.origin.id || tr.meaning.id !== translation.meaning.id));
		console.log("deleted translation: " + JSON.stringify(translation) + "/" + JSON.stringify(filteredLatest));
		this.setState({latest: filteredLatest});
	}
	
	render() {
		let translations = this.state.latest.map(tr => (
			<div key={tr.origin.id + "-" + tr.meaning.id}>
				<Translation 
					mode="print" 
					origin={tr.origin} 
					meaning={tr.meaning} 
					onDelete={() => this.handleDeleteTranslation(tr)}/>
			</div>
			));
		return (
			<>
			<h2>Latest</h2>
			{translations}
			</>
		);
	}
}