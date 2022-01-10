const ID = id => {return document.getElementById(id)};
const URL = "https://evropski-dnevnik-dev.herokuapp.com/api/miths"

const title = ID("title");
const correct = ID("correct");
const desc = ID("description");
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
				correct: Boolean(correct.value),
				decsription: desc.value
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
