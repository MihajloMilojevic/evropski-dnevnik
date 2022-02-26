let check = document.getElementById("slikaCheck");
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
    console.log(document.querySelectorAll("input[name=odgovor]"));
    console.log(document.querySelectorAll("input[name=tacno]"));
}   