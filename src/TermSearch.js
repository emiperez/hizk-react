import React from "react";
import config from "./config.json";

export default class TermSearch extends React.Component {
	
	constructor(props) {
		super(props);
		this.timer = 0;
		this.state = {result: [], text: ""}
	}
	
	handleChange(ce) {
		clearTimeout(this.timer);
		console.log("enter TermSearch.handleChange");
		this.timer = setTimeout(() => (this.setState({text: ce.target.value}), console.log(ce.target.value)), 500);
	}
	
	render() {
		return (<>
		<input type="text" defaultValue={this.props.value} onChange={(e) => (this.handleChange(e))} />
		<input type="text" value={this.state.text} />
		</>);
	}
}