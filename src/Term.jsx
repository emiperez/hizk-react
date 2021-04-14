import React from "react";
import {
	Link
} from "react-router-dom";
import propTypes from "prop-types";
import TermSearch from "./TermSearch"
import locales from "./locales.json";

export default function Term(props) {
	switch (props.mode) {
		case "label":
			return <Link className="termLink" to={"/term/" + props.value.id}>{props.value.text}</Link>;
		case "new":
			return <TermNew className="newTerm" value={props.value} onChange={props.onChange} />;
		case "edit":
			return <TermEdit className="editTerm" value={props.value} onChange={props.onChange} />;
		case "search":
			return <TermSearch className="searchTerm" value={props.value} onChange={props.onChange} />;
		case "guess":
			return <input className="guessTerm" type="text" onBlur={props.onChange} />;
	}
}

Term.propTypes = {
	locale: propTypes.oneOf(locales),
	mode: propTypes.oneOf(["label", "edit",  "search", "guess"])
};
