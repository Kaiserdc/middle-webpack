import data from "../assets/js/data";

import "../assets/css/style.scss"

import rainSound from "../assets/sounds/rain.mp3"
import summerSound from "../assets/sounds/summer.mp3"
import winterSound from "../assets/sounds/winter.mp3"

const root = document.querySelector('#app')
const player = document.createElement('div')
player.classList.add('player')
root.append(player)
const sounds = document.createElement("div")
sounds.classList.add('player__sounds')
player.append(sounds)

function renderSeasons(item,container = sounds, ) {
    const season = document.createElement('div')
    season.classList.add('player__sounds--item', item.title.toLowerCase())

    const audio = document.createElement('audio')
    audio.setAttribute('src', `${item.title.toLowerCase()}Sound`)
    season.append(audio)
    sounds.append(season)
}

data.forEach(renderSeasons)

root.addEventListener('click', e=>{
    if (e.target && e.target.closest('.player__sounds--item')){
        const sound= e.target.querySelector('audio')
        sound.play()
        console.log(sound)
    }
})