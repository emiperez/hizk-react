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
			maxQuestions: this.props.maxQuestions || 20,
			latest: Math.ceil((this.props.latest || 100)/5)*5,
			questionAmount: this.props.questionAmount || 10
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
			.then(data => this.setState({ maxQuestions: Math.ceil(parseInt(data)/5) * 5 }));
	}

	render() {
		return (
			<>
				<div id="questionFilter">
					<div className="filterField">
						<label>Level</label>
						<LevelSelect
							value={this.state.level}
							onChange={e => this.updateMaxQuestionsAfterUpdatingState({ level: e.target.value })} />
					</div>
					<div className="filterField">
						<label>Question Locale</label>
						<LocaleSelect
							value={this.state.questionLocale} 
							onChange={e => this.updateMaxQuestionsAfterUpdatingState({ questionLocale: e.target.value })} />
					</div>
					<div className="filterField">
						<label>Answer Locale</label>
						<LocaleSelect
							value={this.state.answerLocale} 
							onChange={e => this.updateMaxQuestionsAfterUpdatingState({ answerLocale: e.target.value })} />
					</div>
					<div className="filterField">
						<label>Case Sensitive</label>
						<input type="checkbox" defaultChecked={this.state.caseSensitive} />
					</div>
					<div className="filterField">
						<label>Question Amount</label>
						<RangeWithLabel
							id="questionAmount"
							min={5}
							max={20}
							step={5}
							value={this.state.questionAmount}
							onChange={e => this.setState({ questionAmount: e.target.value })} />
					</div>
					<div className="filterField">
						<label>Latest</label>
						<RangeWithLabel
							id="latest"
							min={this.state.questionAmount}
							max={this.state.maxQuestions}
							step={5}
							value={this.state.latest}
							onChange={e => this.setState({ latest: e.target.value })} />
					</div>			
					<button onClick={this.handleStartExamClick}>Start Exam</button>
				</div>
			</>
		);
	}
}
