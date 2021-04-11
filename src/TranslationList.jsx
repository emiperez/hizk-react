import React from "react";
import Translation from "./Translation"

export default class TranslationList extends React.Component {

	constructor(props) {
		super(props);
		console.log("TRANSACTION LIST:" + JSON.stringify(props.translations));
		this.state = { loaded: false, translations: props.translations };
	}

	componentDidUpdate(prevProps) {
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
				onDelete={e => this.props.onDeleteTranslation(e, tr)} />
		));
		return (<div className="translationList">{translations}</div>);
	}
}
