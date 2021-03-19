import React from "react";
import QuestionFilter from "./QuestionFilter";
import Translation from "./Translation";
import config from "./config.json";
import "./style.css";

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.answers = [];
		this.state = {exam: null, answers: null, corrections: null};
		
		this.handleStartExam = this.handleStartExam.bind(this);
		this.handleChangeTranslation = this.handleChangeTranslation.bind(this);
		this.handleGradeExam = this.handleGradeExam.bind(this);
	}
	
	handleStartExam(exam) {
		this.answers = [];
		this.setState({exam: exam, answers: null, corrections: null});
	}
	
	handleChangeTranslation(e, questionId) {
		this.answers.push({id: questionId, locale: this.state.exam.answerLocale, text: e.target.value});
	}
	
	handleGradeExam() {
		fetch(config.apiUrl + "/exams/answers/" + this.state.exam.id,
			{headers: {'Content-Type': 'application/json'},
			method: "PUT", body: JSON.stringify(this.answers)})
			.then(response => response.json())
			.then(data => {
				const answerMap = new Map(this.answers.map(a => [a.id, a]));
				const correctionMap =  new Map(data.map(d => [d.id, d]));
				this.setState(
					{answers: answerMap, corrections: correctionMap}, 
					console.log("STATE ANSWERS: " + JSON.stringify(this.answers) + "/" + JSON.stringify(Array.from(answerMap.entries)) + "/" + JSON.stringify(Array.from(correctionMap.entries)))
				);
				
			});
	}
	
	showCorrection(id) {
		if (this.state.corrections && this.state.corrections.get(id)) {
			console.log("showCorrection: " + this.state.corrections.get(id).text);
			return this.state.corrections.get(id).text;
		}
		return null;
	}
	
	render() {
		return (
			<>
				<div>
					<QuestionFilter 
						level="B1" 
						questionLocale="es"
						answerLocale="de"
						caseSensitive={true}
						questionAmount={15}
						maxQuestions={15}
						latest={100}
						onStartExam={this.handleStartExam} />
				</div>
				{this.state.exam &&
				<div> 
					{this.state.exam.questions.map(question => (
					<div key={question.id} className="examQuestion">
					<Translation
						id={question.id}
						origin={question.text}
						originLocale={question.locale}
						target=""
						targetLocale={this.state.exam.answerLocale}
						mode="exam"
						onChange={e => this.handleChangeTranslation(e, question.id)} />
						{this.showCorrection(question.id)}
					</div>
				))}
				<div>
					<button onClick={this.handleGradeExam}>Grade Exam</button>
				</div>
				</div>
				}
			</>
		);
	}
}
