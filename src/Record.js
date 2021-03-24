import React from "react";
import Term from "./Term";
import Translation from "./Translation";
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
		let translations = this.state.latest.map(tr => (
			<div key={tr.origin.id + "-" + tr.meaning.id}>
				<Translation mode="print" origin={tr.origin} meaning={tr.meaning} />
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