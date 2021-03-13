import React from "react";

export default function RangeWithLabel(props) {
	return (
		<span className="rangeWithLabel" id={props.id}>
			<input
				type="range"
				min={props.min}
				max={props.max}
				onChange={props.onChange}
				value={props.value} />
			<span>{props.value}</span>
		</span>
	);
}
