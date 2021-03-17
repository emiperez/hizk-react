import React from "react";
import QuestionFilter from "./QuestionFilter";
import Translation from "./Translation";
import "./style.css";

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.handleStartExam = this.handleStartExam.bind(this);
	}
	
	handleStartExam(exam) {
		this.setState({exam: exam});
	}
	
	handleGradeExam() {
		alert('Exam graded');
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
				{this.state &&
				<div> 
					{this.state.exam.questions.map(question => (
					<div key={question.id}>
					<Translation 
						origin={question.text}
						originLocale={question.locale}
						target=""
						targetLocale={this.state.exam.answerLocale}
						mode="exam" />
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
