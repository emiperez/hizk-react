import React from "react";

export default class RangeWithLabel extends React.Component {
	constructor(props) {
		super(props);
		this.state = { value: props.defaultValue };
		this.handleChange = this.handleChange.bind(this);
	}
	
	handleChange(e) {
		this.setState({value: e.target.value});
		this.props.onChange(e);
	}

	render() {
		return (
			<span className="rangeWithLabel" id={this.props.id}>
				<input
					type="range"
					min={this.props.min}
					max={this.props.max}
					onChange={this.handleChange}
					defaultValue={this.state.value} />
				<span>{this.state.value}</span>
			</span>
		);
	}
}
