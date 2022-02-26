import host from "./HOSTURL.js";

const URL = host + "/api/games/memory"
// const URL = "http://localhost:3000/api/games/memory"


const brRed = document.getElementById("red")
const brKol = document.getElementById("kolona")

document.getElementById("promena").onclick = Nacrtaj;
document.getElementById("create").onclick = kreiraj;

function Nacrtaj() {
	document.getElementById("urls").innerHTML = "";
	document.getElementById("table").innerHTML = ""
	const n = brRed.value * brKol.value / 2;
	for(let i = 0; i < n; i++)
	{
		const input = document.createElement("input");
		input.type = "text";
		input.name = "url";
		document.getElementById("urls").appendChild(input);
		document.getElementById("urls").appendChild(document.createElement("br"));
	}
	for(let i = 0; i < brRed.value; i++)
	{
		const red = document.createElement("div");
		for(let j = 0; j < brKol.value; j++)
		{
			const input = document.createElement("input");
			input.setAttribute("data-value", "");
			input.type = "number";
			input.min = 0;
			input.max = n - 1;
			input.name = `red${i}`
			red.appendChild(input);
		}
		document.getElementById("table").appendChild(red)
	}
}

async function kreiraj() {
    const urls = Array.from(document.querySelectorAll("[name=url]")).map(url => "/images/" + url.value);
	const level = document.getElementById("level").value;
	let table = [];
	for(let i = 0; i < brRed.value; i++)
		table.push(Array.from(document.querySelectorAll(`[name=red${i}]`)).map(x => Number(x.value)));
    create.disabled = true;
	try {
		const res = await fetch(URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
                urls,
				table,
				level
			})
		})
		const data = await res.json();
		if(data.ok)
		{
			alert("Igra memorije kreirana")
			console.log(data.memory);
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