var start;
var hongerWaarde = document.getElementById('hongerWaarde').value;
var trainWaarde = document.getElementById('trainWaarde').value;
var aaiWaarde = document.getElementById('aaiWaarde').value;
var naamButton = document.getElementById('naamButton');

var hongerKnop = document.getElementById('voedselButton');
var trainKnop = document.getElementById('trainButton');
var aaiKnop = document.getElementById('aaiButton');

//invoer naam pica
var naam = 'naam van de Pokemon';
document.querySelector('h1').textContent = naam;

//wijzigd text inhoud h1 en voorkomt defaultgedrag formulier
function verwerkFormulier(event) {
    event.preventDefault();
    document.querySelector('h1').textContent = document.querySelector('input').value;
}

//voegt event listner toe aan form, luisterd naar submit en die voert vervolgens verwerkformulier functie uit
document.querySelector('form').addEventListener('submit', verwerkFormulier);

//functie voor het bijwerken van de foto in de pokeball
function picabijwerken(hongerWaarde, trainWaarde, aaiWaarde) {

    //array van alle pica foto's
    var picapiccaArray = [ 
        'blijepica.png', 
        'pica.png', 
        'buffpica.png', 
        'depripica.png', 
        'dikkepica.png', 
        'dodepica.png', 
        'bozepica.png',
        'cutepica.png'
      ];

    //als trainwaarde gelijk of hoger zijn dan 90
    if (trainWaarde >= 90) {
        console.log("gespierde pica");
        document.getElementById('picafoto').src = "./fotos/" + picapiccaArray[2];

        document.querySelector('body').classList.remove('achtergrond');
        document.querySelector('body').classList.add('achtergrond2');
    }

    //als honherwaarde gelijk of hoger zijn dan 90
    else if (hongerWaarde >= 90) {
        console.log("dikke pica");
        document.getElementById('picafoto').src = "./fotos/" + picapiccaArray[4];
        document.querySelector('body').classList.remove('achtergrond');
        document.querySelector('body').classList.add('achtergrond3');
    }

    //als aaiwaarde gelijk of hoger zijn dan 90
    else if (aaiWaarde >= 90) {
        console.log("cute pica");
        document.querySelector('body').classList.remove('achtergrond');
        document.querySelector('body').classList.add('achtergrond4');
    }


    //als alle waardes gelijk of hoger zijn dan 80
    else if (hongerWaarde >= 70 && trainWaarde >= 70 && aaiWaarde >= 70) {
        //vervangt de foto voor een blije picachu
        console.log("blijepica");
        document.getElementById('picafoto').src = "./fotos/" + picapiccaArray[0];
    }

    //als de waardes gelijk aan of hoger zijn dan 50
    else if (hongerWaarde >= 50 && trainWaarde >= 50 && aaiWaarde >= 50) {
        //vervangt de foto voor een normale picachu
        console.log("normale pica");
        document.getElementById('picafoto').src = "./fotos/" + picapiccaArray[1];
    }

    //als waardes 50 of lager zijn
    else if (hongerWaarde <= 50 || trainWaarde <= 50 || aaiWaarde <= 50) {
        //Als waardes 20 of lager zijn
        if (hongerWaarde <= 20 || trainWaarde <= 20 || aaiWaarde <= 20) {
            //Als de waardes 0 zijn aka als pica dood gaat
            if (hongerWaarde <= 0 || trainWaarde <= 0 || aaiWaarde <= 0) {
                //vervangt pica voor dodepica.png
                console.log("pica is dede");
                document.getElementById('picafoto').src = "./fotos/" + picapiccaArray[5];

                //dood audio wordt uit html gehaald
                var playdoodaudio = document.getElementById("doodAudio");

                //Speelt de audio af
                playdoodaudio.play();
                playdoodaudio.volume = 0.2;

                //Veranderd de achtergrond
                document.querySelector('body').classList.remove('achtergrond');
                document.querySelector('body').classList.add('achtergrond5');
            } else {
                //veranderd de foto naar een depresieve picachu
                console.log("depri");
                document.getElementById('picafoto').src = "./fotos/" + picapiccaArray[3];

                //Veranderd de achtergrond
                console.log("depri");
                document.getElementById('picafoto').src = "./fotos/" + picapiccaArray[3];            }
        }
        //wanneer de waardes tussen de 20 en 50 zitten
        else {
            //veranderd de foto naar een boze picachu
            console.log("pica is boos");
            document.getElementById('picafoto').src = "./fotos/" + picapiccaArray[6];

            //Veranderd de achtergrond
            document.querySelector('body').classList.remove('achtergrond');
            document.querySelector('body').classList.add('achtergrond6');
        }
    }

}

    // Zorgt voor afnemen progressbar en voor nieuwe waardes
function lowerValue (hongerWaarde, trainWaarde, aaiWaarde) {

    console.log("lower value")
    hongerWaarde -= 7; // Verlaagt de hongerWaarde
    document.getElementById('hongerWaarde').value = hongerWaarde;

    trainWaarde -= 3; // Verlaagt de trainWaarde
    document.getElementById('trainWaarde').value = trainWaarde;

    aaiWaarde -= 5; // Verlaagt de aaiWaarde
    document.getElementById('aaiWaarde').value = aaiWaarde;

    //Check of de foto bijgewerkt moet worden
    picabijwerken(hongerWaarde, trainWaarde, aaiWaarde);

    // Als één van de waardes 0 of kleiner dan 0 is dan stopt de tamagochi
    if (hongerWaarde <= 0 || trainWaarde <= 0 || aaiWaarde <= 0) {
        clearInterval(start);

        // zet de buttons "uit"
        document.getElementById('voedselButton').disabled = true;
        document.getElementById('trainButton').disabled = true;
        document.getElementById('aaiButton').disabled = true;

        //Nieuwe text voor in de h2 die angeeft dat pokemon is overleden
        document.querySelector('h2').textContent = 'oh shit,' + document.querySelector('h1').textContent + 'is dede :(';

        //Haal de restart button tevoorschijn
        document.getElementById('restartButtonDiv').classList.remove('verberg');
    }
}

//Geeft nieuwe waardes aan de progressbar
function startTamagotchi() {
    //Vind de waarde die toegeschreven zijn
    hongerWaarde = document.getElementById('hongerWaarde').value;
    trainWaarde = document.getElementById('trainWaarde').value;
    aaiWaarde = document.getElementById('aaiWaarde').value;
    lowerValue (hongerWaarde, trainWaarde, aaiWaarde);
    console.log("test");
}

//Functie die ervoor zorgt dat de tamagochi begint na invullen van de naam
function naamIngevuld() {
    // Zorgt dat om de seconde de verlaag waarde functie wordt uitgevoerd
    start = setInterval(startTamaotchi, 1000);
}

//Functie voor eten: eetgeluiden en waarde verhogen
function chappen() {

    console.log("nom nom nom")
    //waardes worden verhoogd met +5 bij de progress balk
    hongerWaarde += 10;
    document.getElementById('hongerWaarde').value = hongerWaarde;

    //haal audio uit html
    var voedselPlay = document.getElementById("voedselAudio");

    //Speel de voedsel audio af
    voedselPlay.play();
}

function trainen() {
    //Voegd +5 aan de trainbalk toe
    trainWaarde += 15;
    document.getElementById('trainWaarde').value = trainWaarde;

    //haal audio uit html
    var trainPlay = document.getElementById("trainAudio");

    //Speel de miauw af
    trainPlay.play();
}

function aaien() {
    //waardes worden verhoogd met +5 bij de progress balk
    aaiWaarde += 10;
    document.getElementById('aaiWaarde').value = aaiWaarde;

    //haal audio uit html
    var playAai = document.getElementById("aaiAudio");

    //Speel de miauw af
    playAai.play();
}

//Eventlisteners om de knoppen te linken aan de progressbalk
hongerKnop.addEventListener('click', chappen);
trainKnop.addEventListener('click', trainen);
aaiKnop.addEventListener('click', aaien);
naamButton.addEventListener('click', naamIngevuld);