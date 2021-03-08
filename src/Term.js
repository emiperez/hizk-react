import React from "react";
import PropTypes from "prop-types";
import locales from "./locales.json";

export default class Term extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			locale: this.props.locale,
			mode: this.props.mode
		};
	}
	render() {
		switch (this.props.mode) {
			case "label":
				return <label>{this.props.value}</label>;
			case "search":
				return (
					<input className="searchTerm" type="text" value={this.props.value} />
				);
			case "edit":
				return (
					<input className="editTerm" type="text" value={this.props.value} />
				);
		}
	}
}

Term.PropTypes = {
	locale: PropTypes.oneOf(locales),
	mode: PropTypes.oneOf(["label", "search", "edit"])
};
