import React from "react"; 
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from "react-router-dom";
import TermSearch from "./TermSearch";
import Exam from "./Exam";
import Record from "./Record";
import TermEditor from "./TermEditor";
import "./style.css";

export default function App() {
	return (
		<Router basename="/hizk" >
			<div>
				<nav>
					<ul>
						<li>
							<Link to="/">Exam</Link>
						</li>
						<li>
							<Link to="/record">Record</Link>
						</li>
						<li>
							<TermSearch />
						</li>
					</ul>
				</nav>
				<Switch>
					<Route path="/term/:id" children={<TermEditor />} />
					<Route path="/record">
						<Record />
					</Route>
					<Route path="/">
						<Exam />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

