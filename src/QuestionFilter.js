import React from "react";
import LevelSelect from "./LevelSelect";
import LocaleSelect from "./LocaleSelect";
import RangeWithLabel from "./RangeWithLabel";
import config from "./config.json";

export default class QuestionFilter extends React.Component {
	constructor(props) {
		super(props);
		console.log("props.level: " + this.props.level);
		this.state = {
			level: this.props.level,
			questionLocale: this.props.questionLocale || "es",
			answerLocale: this.props.answerLocale || "de",
			caseSensitive: this.props.caseSensitive || true,
			maxQuestions: parseInt(this.props.maxQuestions || 100),
			latest: parseInt(this.props.latest || 100),
			questionAmount: parseInt(this.props.questionAmount || 10)
		};		
		this.handleStartExamClick = this.handleStartExamClick.bind(this);
	}

	handleStartExamClick() {
		let parentFunction = this.props.onStartExam;
		fetch(config.apiUrl + '/exams', {
			method: 'POST',
			body: JSON.stringify(this.state),
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(function(response) {
				return response.json();
			})
			.then(function(data) {
				parentFunction(data);
			})
			.catch(function(error) {
				console.error(error);
			})
	}

	componentDidMount() {
		this.updateMaxQuestions();
	}

	updateMaxQuestionsAfterUpdatingState(newState) {
		this.setState(newState, function() { this.updateMaxQuestions(); });
	}

	updateMaxQuestions() {
		fetch(config.apiUrl + "/translations/count/" + this.state.questionLocale + "/" + this.state.answerLocale + "/" + this.state.level)
			.then(response => response.text())
			.then(data => {
				console.log("data: " + data);
				this.setState({ maxQuestions: parseInt(data) });});
	}

	render() {
		return (
			<>
				<div id="questionFilter">

					<LevelSelect onChange={e => this.updateMaxQuestionsAfterUpdatingState({level: e.target.value})} 
						value={this.state.level} />
					<LocaleSelect onChange={e => this.updateMaxQuestionsAfterUpdatingState({questionLocale: e.target.value})} 
						value={this.state.questionLocale} />
					<LocaleSelect onChange={e => this.updateMaxQuestionsAfterUpdatingState({answerLocale: e.target.value})} 
						value={this.state.answerLocale} />
					<input type="checkbox" defaultChecked={this.state.caseSensitive} />
					<RangeWithLabel
						id="questionAmount"
						min={5}
						max={20}
						onChange={e => this.setState({questionAmount: e.target.value})}
						value={this.state.questionAmount} />
					<RangeWithLabel
						id="latest"
						min={this.state.questionAmount}
						max={this.state.maxQuestions}
						value={this.state.latest}
						onChange={e => this.setState({latest: e.target.value})} />
					<button onClick={this.handleStartExamClick}>Start Exam</button>
				</div>
			</>
		);
	}
}
