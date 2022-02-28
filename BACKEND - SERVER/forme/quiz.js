import host from "./HOSTURL.js";

const URL = host + "/api/games/choice"
// const URL = "http://localhost:3000/api/games/choice"

document.getElementById("dodaj").onclick = addAnswer;
document.getElementById("create").onclick = kreiraj;

let brojOdgovora = 0;

function addAnswer() {

    let control = document.createElement("div");
    let polje = document.createElement("input");
    let radio = document.createElement("input");
    control.id = "control";
    
    polje.type = "text";
    polje.name = "odgovor"
    
    radio.type = "radio";
    radio.value = brojOdgovora;
    radio.name = "tacno";
    
    control.appendChild(polje);
    control.appendChild(radio);
    
    
    document.getElementById("odgovori").appendChild(control);
    brojOdgovora++;
}

async function kreiraj() {
    if(brojOdgovora === 0)
    {
        alert("Dodajte odgovore");
        return; 
    }
    const sviOdgovori = Array.from(document.querySelectorAll("input[name=odgovor]"))
    const answers = sviOdgovori.map(od => od.value);
    const radio = Array.from(document.querySelectorAll("input[name=tacno]"));
    const index = radio.filter(r => r.checked);
    if(index.length === 0)
    {
        alert("Čekirajte tačan odgovor");
        return;
    }
    const question = document.getElementById("question").value;
    const level = document.getElementById("level").value;
    create.disabled = true;
	try {
		const res = await fetch(URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
                type: "quiz",
				question,
                answers,
                correct: index[0].value,
				level
			})
		})
		const data = await res.json();
		if(data.ok)
		{
			alert("Kviz kreiran")
			console.log(data.choice);
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