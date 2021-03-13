import React from "react";
import LevelSelect from "./LevelSelect";
import RangeWithLabel from "./RangeWithLabel";
import config from "./config.json";

export default class Filter extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			level: this.props.level,
			originLocale: this.props.originLocale,
			targetLocale: this.props.targetLocale,
			maxQuestions: parseInt(this.props.maxQuestions),
			latest: parseInt(this.props.latest),
			questionAmount: parseInt(this.props.questionAmount)
		};

		this.handleLevelChange = this.handleLevelChange.bind(this);
		this.handleChangeQuestionAmount = this.handleChangeQuestionAmount.bind(this);
		this.handleLatestChange = this.handleLatestChange.bind(this);
	}

	handleLevelChange(e) {
		fetch(config.apiUrl + "/translations/count/es/de/" + e.target.value)
			.then(response => response.text())
			.then(data => this.setState({ maxQuestions: parseInt(data) }));
	}

	handleChangeQuestionAmount(e) {
		this.setState({
			questionAmount: e.target.value
		});
	}

	handleLatestChange(e) {
		this.setState({ latest: e.target.value });
	}

	componentDidMount() {
		fetch(config.apiUrl + "/translations/count/es/de/" + this.state.level)
			.then(response => parseInt(response.text()))
			.then(data => this.setState({ maxQuestions: data }));
	}

	render() {
		return (
			<div id="questionFilter">

				<LevelSelect
					onChange={this.handleLevelChange}
					value={this.state.level} />
				<RangeWithLabel
					id="questionAmount"
					min="5"
					max="20"
					onChange={this.handleChangeQuestionAmount}
					value={this.state.questionAmount} />
				<RangeWithLabel
					id="latest"
					min={this.state.questionAmount}
					max={this.state.maxQuestions}
					value={this.state.latest}
					onChange={this.handleLatestChange} />
			</div>
		);
	}
}
