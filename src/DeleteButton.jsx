import React from "react";

export default function DeleteButton(props) {
	return <button onClick={() => {confirm("Are you sure you want to DELETE it?") && props.onClick();}}>Delete</button>;
}
