const songs = [
  {
    songTitle: "Fake a smile",
    artist: "Alan Walker",
    songSrc: "./Audio/Alan.mp3",
    songCover: "./images/walker.jpg",
  },
  {
    songTitle: "Stranger Things",
    artist: "Kygo",
    songSrc: "./Audio/Kygo.mp3",
    songCover: "./images/kygo.jpg",
  },
  {
    songTitle: "Fly High",
    artist: "Burnout Syndromes",
    songSrc: "./Audio/fly-high.mp3",
    songCover: "./images/burnout.jpg",
  },
  {
    songTitle: "Silhouette",
    artist: "Kana Boon",
    songSrc: "./Audio/Silhouette.mp3",
    songCover: "./images/kanaboon.jpg",
  },
  {
    songTitle: "Broken Youth",
    artist: "Nico Touches the walls",
    songSrc: "./Audio/broken-youth.mp3",
    songCover: "./images/nico.jpg",
  },
  {
    songTitle: "Fades Away",
    artist: "Avicii",
    songSrc: "./Audio/FadesAway.mp3",
    songCover: "./images/avicii.jpg",
  },
];

//Global Selectors
const play = document.querySelector("#play");
const cover = document.querySelector(".cover");
const header = document.querySelector("h1");
const range = document.querySelector("input");
const pre = document.querySelector("#pre");
const forward = document.querySelector("#forward");
const headers = document.querySelectorAll("h3");
const songArtist = document.querySelector(".song-artist");
const leftContainer = document.querySelector(".left-container");
const burger = document.querySelector(".burger");
const lineOne = document.querySelector(".line1");
const lineTwo = document.querySelector(".line2");
const audioTag = document.querySelector("#audio");
const timese = Math.floor(audioTag.duration);
let isActive = false;
let dest = "./Audio";
let ext = ".mp3";
let isPlaying = false;
let duration;
let currentTime = 0;

//Audio Object
const audio = new Audio();
let counter = 0;

//Event Handlers
play.addEventListener("click", songPlay);
window.onload = onloads();

//Functions
async function songPlay() {
  audio.src = songs[counter].songSrc;
  audioTag.setAttribute("src", audio.src);
  if (!isPlaying) {
    audio.currentTime = range.value;
    audio.play();
    isPlaying = true;
    audioTag.addEventListener("loadedmetadata", (e) => {
      duration = audioTag.duration;
      range.max = audioTag.duration;
    });
    cover.src = songs[counter].songCover;
    songArtist.innerHTML = "By " + songs[counter].artist;
    cover.classList.add("active-img");
    header.innerText = songs[counter].songTitle;
    play.innerHTML = "<i class='fas fa-pause'></i>";
  } else {
    audio.pause();
    audio.currentTime = range.value;
    isPlaying = false;
    play.innerHTML = "<i class='fas fa-play'></i>";
    cover.classList.remove("active-img");
    play.style.animation = " ";
  }
  range.addEventListener("change", (e) => {
    audio.currentTime = range.value;
  });
  audio.addEventListener("timeupdate", () => {
    range.value = audio.currentTime;
  });
  forward.addEventListener("click", () => {
    const count = (counter % songs.length) + 1;
    if (!songs.includes(songs[count])) {
      counter = 0;
      audio.src = songs[counter].songSrc;
      audioTag.setAttribute("src", audio.src);
      audioTag.addEventListener("loadedmetadata", (e) => {
        duration = audioTag.duration;
        range.max = audioTag.duration;
      });
      audio.play();
      header.innerText = songs[counter].songTitle;
      cover.src = songs[counter].songCover;
      songArtist.innerHTML = "By" + " " + songs[counter].artist;
    } else {
      counter++;
      audio.src = songs[counter].songSrc;
      audioTag.setAttribute("src", audio.src);
      audioTag.addEventListener("loadedmetadata", (e) => {
        duration = audioTag.duration;
        range.max = audioTag.duration;
      });
      audio.play();
      header.innerText = songs[counter].songTitle;
      cover.src = songs[counter].songCover;
      songArtist.innerHTML = "By" + " " + songs[counter].artist;
    }
  });
  pre.addEventListener("click", () => {
    if ((counter % songs.length) - 1 === -1) {
      counter = songs.length - 1;
      audio.src = songs[counter].songSrc;
      audioTag.setAttribute("src", audio.src);
      audioTag.addEventListener("loadedmetadata", (e) => {
        duration = audioTag.duration;
        range.max = audioTag.duration;
      });
      audio.play();
      header.innerText = songs[counter].songTitle;
      cover.src = songs[counter].songCover;
      songArtist.innerHTML = "By" + " " + songs[counter].artist;
    } else {
      counter--;
      audio.src = songs[counter].songSrc;
      audioTag.setAttribute("src", audio.src);
      audioTag.addEventListener("loadedmetadata", (e) => {
        duration = audioTag.duration;
        range.max = audioTag.duration;
      });
      audio.play();
      header.innerText = songs[counter].songTitle;
      cover.src = songs[counter].songCover;
      songArtist.innerHTML = "By" + " " + songs[counter].artist;
    }
  });
  headers.forEach((headerr) => {
    headerr.addEventListener("click", (e) => {
      audio.src = dest + "/" + e.target.id + ext;
      audioTag.setAttribute("src", audio.src);
      audioTag.addEventListener("loadedmetadata", (e) => {
        duration = audioTag.duration;
        range.max = audioTag.duration;
      });
      counter = headerr.getAttribute("data-track");
      audio.play();
      header.innerText = e.target.innerText;
      cover.src = e.target.className;
      songArtist.innerHTML =
        "By " + e.target.parentElement.children[1].innerText;
    });
  });
  audio.addEventListener("ended", () => {
    counter++;
    audio.src = songs[counter].songSrc;
    audioTag.setAttribute("src", audio.src);
    audioTag.addEventListener("loadedmetadata", (e) => {
      duration = audioTag.duration;
      range.max = audioTag.duration;
    });
    audio.play();
    header.innerText = songs[counter].songTitle;
    songArtist.innerHTML = "By" + " " + songs[counter].artist;
    cover.src = songs[counter].songCover;
  });
}

function onloads() {
  audio.src = "";
  audio.currentTime = 0;
  range.value = 0;
}

burger.addEventListener("click", () => {
  if (!isActive) {
    leftContainer.classList.add("active-container");
    leftContainer.classList.remove(".notactive-container");
    isActive = true;
  } else {
    leftContainer.classList.add(".notactive-container");
    leftContainer.classList.remove("active-container");
    isActive = false;
  }
});

function millisToMinutesAndSeconds(time) {
  return Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2);
}
