import React from "react";
import QuestionFilter from "./QuestionFilter";
import Translation from "./Translation";
import "./style.css";

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.answers = new Map();
		this.state = {exam: null}
		
		this.handleStartExam = this.handleStartExam.bind(this);
		this.handleChangeTranslation = this.handleChangeTranslation.bind(this);
		this.handleGradeExam = this.handleGradeExam.bind(this);
	}
	
	handleStartExam(exam) {
		this.setState({exam: exam});
	}
	
	handleChangeTranslation(e, questionId) {
		console.log("changed: " + e.target.value + "/" + questionId);
		this.answers.set(questionId, e.target.value);
	}
	
	handleGradeExam() {
		console.log(JSON.stringify(this.state.exam));
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
