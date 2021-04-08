export function handleHttpErrors(response) {
	console.log("handleHttpErros: " + JSON.stringify(response));
	if (!response.ok) throw Error(response.statusText);
	return response;
}