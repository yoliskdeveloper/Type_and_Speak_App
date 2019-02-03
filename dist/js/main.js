// Initail Speechsynth API
const synth = window.speechSynthesis;

// DOM Elements
const textForm = document.querySelector("form");
const textInput = document.querySelector("#text-input");
const voiceSelect = document.querySelector("#voice-select");
const rate = document.querySelector("#rate");
const rateValue = document.querySelector("#rate-value");
const pitch = document.querySelector("#pitch");
const pitchValue = document.querySelector("#pitch-value");
const body = document.querySelector("body");

// init voices array
let voices = [];

const getVoices = () => {
  voices = synth.getVoices();

  // Loop through voices and create and option for each one
  voices.forEach(voice => {
    // Create option Element
    const option = document.createElement("option");
    // fill the option with voice and language
    option.textContent = voice.name + "(" + voice.lang + ")";
    // set needed option attributes
    option.setAttribute("data-lang", voice.lang);
    option.setAttribute("data-name", voice.name);
    voiceSelect.appendChild(option);
  });
};

getVoices();
if (synth.onvoiceschanged !== undefined) {
  synth.onvoiceschanged = getVoices;
}

// Speak
const speak = () => {
  // check if speaking
  if (synth.speaking) {
    console.error("Already Speaking...");
    return;
  }
  if (textInput.value !== " ") {
    // Animation Wave
    body.style.background = "#141414 url(img/soundwave.gif)";
    body.style.backgroundRepeat = "repeat-x";
    // eslint-disable-next-line no-unused-expressions
    body.style.backgroundSize - "100% 100%";
    // eslint-disable-next-line no-unused-expressions
    body.style.backgroundPositionY; "20px";
    // Get Speak text
    // eslint-disable-next-line no-undef
    const speakText = new SpeechSynthesisUtterance(textInput.value);

    // speak end
    speakText.onend = e => {
      console.log("Done Speaking...");
      body.style.background = "#141414";
    };

    // speak error
    speakText.onerror = e => {
      console.error("something went wrong");
    };

    // Selected Voice
    const selectedVoice = voiceSelect.selectedOptions[0].getAttribute("data-name");

    // Loop through
    voices.forEach(voice => {
      if (voice.name === selectedVoice) {
        speakText.voice = voice;
      }
    });

    // set pitch and rate
    speakText.rate = rate.value;
    speakText.pitch = pitch.value;

    // Speak
    synth.speak(speakText);
  }
};

// EVENT LISTENER

// text form submit
textForm.addEventListener("submit", e => {
  e.preventDefault();
  speak();
  textInput.blur();
});

// Rate value change
rate.addEventListener("change", e => (rateValue.textContent = rate.value));

// Pitch value change
pitch.addEventListener("change", e => (pitchValue.textContent = pitch.value));

// voice select change
voiceSelect.addEventListener("change", e => speak());
