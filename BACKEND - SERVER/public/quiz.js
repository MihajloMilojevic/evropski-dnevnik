let check = document.getElementById("slikaCheck");

const addAnswer = async () => {

    let control = document.createElement("div");
    let polje = document.createElement("input");
    let radio = document.createElement("input");
    control.id = "control";

    polje.type = "text";
    polje.id = "odgovor"

    radio.type = "radio";
    radio.id = "correct";

    control.appendChild(polje);
    control.appendChild(radio);


    document.getElementById("odgovori").appendChild(control);
}

const kreiraj = async () => {

}