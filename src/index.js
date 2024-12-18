import data from "../assets/js/data";

import "../assets/css/style.scss"

import rainSound from "../assets/sounds/rain.mp3"
import summerSound from "../assets/sounds/summer.mp3"
import winterSound from "../assets/sounds/winter.mp3"

import rainIcon from "../assets/img/icons/cloud-rain.svg"
import summerIcon from "../assets/img/icons/sun.svg"
import winterIcon from "../assets/img/icons/cloud-snow.svg"

const soundMapping = {
    rainy: rainSound,
    summer: summerSound,
    winter: winterSound,
};

const weatherIcons = {
    rainy: rainIcon,
    summer: summerIcon,
    winter: winterIcon,
}

const root = document.querySelector('#app')
const player = document.createElement('div')
player.classList.add('player')
root.append(player)

function renderSeasons(item) {
    const season = document.createElement('div')
    const seasonTitle = item.title.toLowerCase()
    const seasonIcon = document.createElement('img')
    seasonIcon.src = weatherIcons[seasonTitle]
    season.append(seasonIcon)
    season.dataset.audio = soundMapping[seasonTitle]
    season.dataset.season = seasonTitle
    season.classList.add('player__item', seasonTitle)

    playerList.append(season)
}

const playerList = document.createElement("div")
playerList.classList.add('player__list')
player.append(playerList)

const audio = document.createElement('audio')
player.append(audio)

const volume = document.createElement('div')
const volumeHoverBox = document.createElement('div')
const volumeBar = document.createElement('div')
const volumeFill = document.createElement('div')
const volumeRangeInput = document.createElement('input')
volume.classList.add('volume')
volumeRangeInput.classList.add('volume__range')
volumeRangeInput.type = 'range'
volumeRangeInput.min = '0'
volumeRangeInput.max = '100'
volumeRangeInput.step = '0.5'
volumeRangeInput.value = '50'

volumeHoverBox.classList.add('volume__box')
volumeBar.classList.add('volume__bar')
volumeFill.classList.add('volume__fill')
volumeBar.append(volumeFill)
volume.append(volumeRangeInput)
volumeHoverBox.append(volumeBar)
volume.append(volumeHoverBox)

player.append(volume)
const setVolumeValue = (value) => {
    audio.volume = value / 100
    volumeFill.style.width = value + "%";
    volumeRangeInput.setAttribute("value", value)
    volumeRangeInput.dispatchEvent(new Event("change"))
}
setVolumeValue(volumeRangeInput.value);

const calculateFill = (e) => {
    let offsetX = e.offsetX

    if (e.type === "touchmove") {
        offsetX = e.touches[0].pageX - e.touches[0].target.offsetLeft
    }

    const width = e.target.offsetWidth - 30;
    setVolumeValue(
        Math.max(
            Math.min(
                (offsetX - 15) / width * 100.0,
                100.0
            ),
            0
        )
    );
}

let barStillDown = false;

volumeHoverBox.addEventListener("touchstart", (e) => {
    barStillDown = true;

    calculateFill(e);
}, true);
//
volumeHoverBox.addEventListener("touchmove", (e) => {
    if (barStillDown) {
        calculateFill(e);
    }
}, true);

volumeHoverBox.addEventListener("mousedown", (e) => {
    barStillDown = true;

    calculateFill(e);
}, true);

volumeHoverBox.addEventListener("mousemove", (e) => {
    if (barStillDown) {
        calculateFill(e);
    }
});

volumeHoverBox.addEventListener("wheel", (e) => {
    const newValue = +range.value + e.deltaY * 0.5;

    setValue(Math.max(
        Math.min(
            newValue,
            100.0
        ),
        0
    ))
});

document.addEventListener("mouseup", (e) => {
    barStillDown = false;
}, true);

document.addEventListener("touchend", (e) => {
    barStillDown = false;
}, true);


data.forEach(renderSeasons)

root.addEventListener('click', e => {
    if (e.target && e.target.closest('.player__item')) {
        const item = e.target.closest('.player__item')

        if (item.classList.contains('active')) {
            if (item.classList.contains('paused')) {
                audio.play()
                item.classList.remove('paused')
            } else {
                audio.pause()
                item.classList.add('paused')
            }
        } else {
            const allSeasons = player.querySelectorAll('.player__item')
            allSeasons.forEach(item => item.classList.remove('active', 'paused'))
            audio.pause()
            audio.setAttribute('src', item.dataset.audio)
            audio.play()
            item.classList.add('active')
        }
        document.body.className = ''
        document.body.classList.add(item.dataset.season)
    }
})