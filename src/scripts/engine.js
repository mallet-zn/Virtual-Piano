const pianoKeys = document.querySelectorAll(".piano-keys .key");
const volumeSlider = document.querySelector(".volume-slider input");
const keysCheck = document.querySelector(".keys-check input")

const mapedKeys = [];
const audios = {};

const playTune = (key) => {
    const audio = new Audio(`src/tunes/${key.toLowerCase()}.wav`);
    audios[key] = audio;

    audio.addEventListener('ended', () => delete audios[key]);
    audio.volume = volumeSlider.value;
    audio.play();

    const clickedKey = document.querySelector(`[data-key="${key.toLowerCase()}"]`);
    clickedKey.classList.add("active");
    setTimeout(() => clickedKey.classList.remove("active"), 150);
};

const stopTune = (key) => (audios[key]) ? delete audios[key] : void (0);


pianoKeys.forEach((keyParameter) => {
    keyParameter.addEventListener('click', () => playTune(keyParameter.dataset.key));
    mapedKeys.push(keyParameter.dataset.key);
});


document.addEventListener('keydown', (e) => {
    (mapedKeys.includes((e.key.toLowerCase() || e.key.toUpperCase())) && !audios[e.key]) ? playTune(e.key) : void (0);
});


document.addEventListener('keyup', (e) => stopTune(e.key));

const handleVolume = (e) => {
    Object.values(audios).forEach(audio => { audio.volume = e.target.value });
};

const showHideKeys = () => { pianoKeys.forEach((key) => key.classList.toggle("hide")) };

volumeSlider.addEventListener("input", handleVolume);
keysCheck.addEventListener('click', showHideKeys);