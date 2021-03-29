import React from "react";
import propTypes from "prop-types";
import TermSearch from "./TermSearch"
import locales from "./locales.json";

export default function Term(props) {
	switch (props.mode) {
		case "label":
			return <a className="termLink" href={"term/" + props.value.id}>{props.value.text}</a>;
		case "search":
			return <TermSearch className="searchTerm" type="text" value={props.value.text} onChange={props.onChange} />;
		case "guess":
			return <input className="guessTerm" type="text" onBlur={props.onChange} />;
	}
}

Term.propTypes = {
	locale: propTypes.oneOf(locales),
	mode: propTypes.oneOf(["label", "search", "guess"])
};
