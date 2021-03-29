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
import "./style.css";

export default function App() {
	return (
		<Router>
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

