import React from "react";
import Translation from "./Translation"

export default class TranslationList extends React.Component {

	constructor(props) {
		super(props);
		console.log("TRANSACTION LIST:" + JSON.stringify(props.translations));
		this.state = { loaded: false, translations: props.translations };
		this.handleDeleteTranslation = this.handleDeleteTranslation.bind(this);
	}

	handleDeleteTranslation() {
		console.log("TranslationList.onDeleteTranslation");
		this.props.onDeleteTranslation();
	}

	componentDidUpdate(prevProps) {
		console.log("Translation List did Update: " + JSON.stringify(this.props.translations));
		console.log("Translation List did Update prev: " + JSON.stringify(prevProps.translations));
		if (this.props.translations !== prevProps.translations) {
			this.setState({translations: this.props.translations});
		}
	}

	render() {
		const translations = this.state.translations.map(tr => (
			<Translation
				key={tr.origin.id + "-" + tr.meaning.id}
				mode="print"
				object={tr}
				onDelete={e => this.handleDeleteTranslation(e, tr)} />
		));
		return (<div>{translations}</div>);
	}
}
