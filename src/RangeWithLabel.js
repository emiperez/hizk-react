import React from "react";

export default class RangeWithLabel extends React.Component {
	constructor(props) {
		super(props);
		this.state = { value: parseInt(props.value || props.defaultValue) };
		this.handleChange = this.handleChange.bind(this);
	}

	static getDerivedStateFromProps(props, state) {
		if (parseInt(props.min) > state.value) {
			return { value: props.min };
		}
		if (parseInt(props.max) < state.value) {
			return { value: props.max };
		}
		return null;
	}
	
	handleChange(e) {
		this.setState({ value: e.target.value });
		this.props.onChange(e);
	}

	render() {
		return (
			<span className="rangeWithLabel" id={this.props.id}>
				<input
					type="range"
					min={this.props.min}
					max={this.props.max}
					step={this.props.step}
					onChange={this.handleChange}
					value={this.state.value} />
				<span>{this.state.value}</span>
			</span>
		);
	}
}
