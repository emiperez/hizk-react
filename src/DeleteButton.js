import React from "react";

export default function DeleteButton(props) {
	console.log("DeleteButton.onClick: " + props.onClick.toString())
	return <button onClick={() => {confirm("Are you sure you want to DELETE it?") && props.onClick();}}>Delete</button>;
}
