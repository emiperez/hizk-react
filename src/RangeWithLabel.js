import React from "react";

export default class RangeWithLabel extends React.Component {
	constructor(props) {
		super(props);
		this.state = { value: props.value || props.defaultValue };
	}

	render() {
		return (
			<span className="rangeWithLabel" id={this.props.id}>
				<input
					type="range"
					min={this.props.min}
					max={this.props.max}
					onChange={e => this.setState({ value: e.target.value })}
					value={this.state.value} />
				<span>{this.state.value}</span>
			</span>
		);
	}
}
