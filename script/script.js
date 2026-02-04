// =====================
// Tamagotchi Pokemon JS
// =====================

let start = null;

// Pak de progress elements (niet .value, maar het element zelf)
const hongerEl = document.getElementById('hongerWaarde');
const trainEl  = document.getElementById('trainWaarde');
const aaiEl    = document.getElementById('aaiWaarde');

const naamButton = document.getElementById('naamButton');

const hongerKnop = document.getElementById('voedselButton');
const trainKnop  = document.getElementById('trainButton');
const aaiKnop    = document.getElementById('aaiButton');

// Startwaarden als nummers
let hongerWaarde = Number(hongerEl.value);
let trainWaarde  = Number(trainEl.value);
let aaiWaarde    = Number(aaiEl.value);

// Invoer naam pica
let naam = 'naam van de Pokemon';
document.querySelector('h1').textContent = naam;

// Wijzigt text inhoud h1 en voorkomt default gedrag formulier
function verwerkFormulier(event) {
  event.preventDefault();
  const input = document.querySelector('input').value.trim();
  if (input.length > 0) {
    document.querySelector('h1').textContent = input;
  }
}

// Voegt event listener toe aan form
document.querySelector('form').addEventListener('submit', verwerkFormulier);

// Helper: clamp tussen 0 en 100
function clamp(val) {
  return Math.max(0, Math.min(100, val));
}

// Helper: update UI progress bars
function updateProgressbars() {
  hongerEl.value = hongerWaarde;
  trainEl.value = trainWaarde;
  aaiEl.value = aaiWaarde;
}

// Functie voor het bijwerken van de foto in de pokeball
function picabijwerken() {
  const picapiccaArray = [
    'blijepica.png',
    'pica.png',
    'buffpica.png',
    'depripica.png',
    'dikkepica.png',
    'dodepica.png',
    'bozepica.png',
    'cutepica.png'
  ];

  const body = document.querySelector('body');
  const picaFoto = document.getElementById('picafoto');

  // Background reset (handig zodat je niet vast blijft hangen op een achtergrond)
  body.classList.remove('achtergrond', 'achtergrond2', 'achtergrond3', 'achtergrond4', 'achtergrond5', 'achtergrond6');
  body.classList.add('achtergrond');

  // Dood eerst checken
  if (hongerWaarde <= 0 || trainWaarde <= 0 || aaiWaarde <= 0) {
    picaFoto.src = "./fotos/" + picapiccaArray[5];

    const playdoodaudio = document.getElementById("doodAudio");
    if (playdoodaudio) {
      playdoodaudio.volume = 0.2;
      playdoodaudio.play();
    }

    body.classList.remove('achtergrond');
    body.classList.add('achtergrond5');
    return;
  }

  // Heel blij (allemaal hoog)
  if (hongerWaarde >= 70 && trainWaarde >= 70 && aaiWaarde >= 70) {
    picaFoto.src = "./fotos/" + picapiccaArray[0];
    return;
  }

  // Specifieke “extremen”
  if (trainWaarde >= 90) {
    picaFoto.src = "./fotos/" + picapiccaArray[2];
    body.classList.remove('achtergrond');
    body.classList.add('achtergrond2');
    return;
  }

  if (hongerWaarde >= 90) {
    picaFoto.src = "./fotos/" + picapiccaArray[4];
    body.classList.remove('achtergrond');
    body.classList.add('achtergrond3');
    return;
  }

  if (aaiWaarde >= 90) {
    picaFoto.src = "./fotos/" + picapiccaArray[7];
    body.classList.remove('achtergrond');
    body.classList.add('achtergrond4');
    return;
  }

  // Laag/boos/depri
  if (hongerWaarde <= 20 || trainWaarde <= 20 || aaiWaarde <= 20) {
    picaFoto.src = "./fotos/" + picapiccaArray[3]; // depri
    return;
  }

  if (hongerWaarde <= 50 || trainWaarde <= 50 || aaiWaarde <= 50) {
    picaFoto.src = "./fotos/" + picapiccaArray[6]; // boos
    body.classList.remove('achtergrond');
    body.classList.add('achtergrond6');
    return;
  }

  // Default normaal
  picaFoto.src = "./fotos/" + picapiccaArray[1];
}

// Zorgt voor afnemen progressbar en voor nieuwe waardes
function lowerValue() {
  hongerWaarde = clamp(hongerWaarde - 7);
  trainWaarde = clamp(trainWaarde - 3);
  aaiWaarde = clamp(aaiWaarde - 5);

  updateProgressbars();
  picabijwerken();

  // Als dood: stop interval + disable knoppen + tekst + restart zichtbaar
  if (hongerWaarde <= 0 || trainWaarde <= 0 || aaiWaarde <= 0) {
    clearInterval(start);
    start = null;

    hongerKnop.disabled = true;
    trainKnop.disabled = true;
    aaiKnop.disabled = true;

    document.querySelector('h2').textContent =
      'oh shit, ' + document.querySelector('h1').textContent + ' is dede :(';

    document.getElementById('restartButtonDiv').classList.remove('verberg');
  }
}

// Start tick
function startTamagotchi() {
  lowerValue();
}

// Functie die ervoor zorgt dat de tamagochi begint na invullen van de naam
function naamIngevuld(event) {
  // voorkomt dat de button (submit) rare side effects geeft bij sommige browsers
  if (event) event.preventDefault();

  // niet meerdere intervals starten
  if (start !== null) return;

  // start direct en daarna elke seconde
  startTamagotchi();
  start = setInterval(startTamagotchi, 1000);
}

// Functie voor eten
function chappen() {
  hongerWaarde = clamp(hongerWaarde + 10);
  updateProgressbars();
  picabijwerken();

  const voedselPlay = document.getElementById("voedselAudio");
  if (voedselPlay) voedselPlay.play();
}

function trainen() {
  trainWaarde = clamp(trainWaarde + 15);
  updateProgressbars();
  picabijwerken();

  const trainPlay = document.getElementById("trainAudio");
  if (trainPlay) trainPlay.play();
}

function aaien() {
  aaiWaarde = clamp(aaiWaarde + 10);
  updateProgressbars();
  picabijwerken();

  const playAai = document.getElementById("aaiAudio");
  if (playAai) playAai.play();
}

// Eventlisteners
hongerKnop.addEventListener('click', chappen);
trainKnop.addEventListener('click', trainen);
aaiKnop.addEventListener('click', aaien);

// Let op: jouw start button zit in een form en is type="submit".
// Daarom preventDefault in naamIngevuld, zodat start altijd werkt zonder reload/submit gedoe.
naamButton.addEventListener('click', naamIngevuld);
