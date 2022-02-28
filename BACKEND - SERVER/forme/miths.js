import host from "./HOSTURL.js";

const ID = id => {return document.getElementById(id)};
// const URL = host + "/api/games/mith"
const URL = "http://localhost:3000/api/games/mith"

const title = ID("title");
const correct = ID("correct");
const desc = ID("description");
const level = ID("level");
const create = ID("create");
console.log(title);

const createMith = async () => {
	create.disabled = true;
	try {
		const res = await fetch(URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				title: title.value,
				correct: Boolean(correct.checked),
				description: desc.value,
				level: level.value
			})
		})
		const data = await res.json();
		if(data.ok)
		{
			alert("Mit kreiran")
			console.log(data.mith);
		}
		else
			throw new Error(data.message)
	} catch (error) {
		alert(error.message)
	}
	finally {
		create.disabled = false;
	}
}


create.addEventListener("click", createMith)