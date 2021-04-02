import React from "react";
import Translation from "./Translation"

export default class TranslationList extends React.Component {

	constructor(props) {
		super(props);
		console.log("TRANSACTION LIST:" + JSON.stringify(props.translations));
		this.state = {loaded: false, translations: props.translations };
		this.handleDeleteTranslation = this.handleDeleteTranslation.bind(this);
	}

	static getDerivedStateFromProps(props, state) {
		console.log("derived:" + JSON.stringify(state.translations));
		if (!state.loaded && props.translations !== state.translations) {
			return {loaded: true, translations: props.translations};
		}		
		return state;
	}

	handleDeleteTranslation(e, translation) {
		console.log("handleDeleteTranslation");
		const filteredLatest = this.state.translations.filter(tr => (
			tr.origin.id !== translation.origin.id || tr.meaning.id !== translation.meaning.id));
		console.log("removed translation: " + JSON.stringify(translation) + "/" + JSON.stringify(filteredLatest));
		this.setState({translations: filteredLatest }, );
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
