console.log('Lets write Javascript');

let currentSong = new Audio();
let songs;
let currentFolder;

function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}


async function getSongs(folder) {
    currentFolder = folder;
    let a = await fetch(`songs/audio/${folder}`);
    let response = await a.text();
    let div = document.createElement("div")
    div.innerHTML = response;

    let as = div.getElementsByTagName("a")
    songs = []

    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(decodeURI(element.href).split(/[/\\]/).pop());
        }
    }

    //Show all the songs in the playlist
    let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0]
    songUL.innerHTML = "";
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML +
            `<li>
                                <img class="invert" src="images_and_icons/music.svg" alt="">
                                <div class="info">
                                    <div>${decodeURIComponent(song)}</div>
                                    <div></div>
                                </div>
                                <div class="playnow">
                                    <span>Play Now</span>
                                    <img class="invert" src="images_and_icons/play.svg" alt="">
                                </div>
    </li>`;


    }
    //Attach an event listner to each song
    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            console.log("Now playing : ", e.querySelector(".info").firstElementChild.innerHTML);
            playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
        })
    })

    return songs

}

const playMusic = (track, pause = false) => {
    // let audio = new Audio("%5Csongs%5Caudio%5C" + track)
    currentSong.src = `songs/audio/${currentFolder}/` + track
    // console.log(currentSong.src);
    if (!pause) {
        currentSong.play()
    }
    if (!pause) {
        play.src = "images_and_icons/pause.svg"
    } else {
        play.src = "images_and_icons/play.svg"
    }
    if (track) {
        document.querySelector(".songinfo").innerHTML = decodeURI(track)
    } else {
        document.querySelector(".songinfo").innerHTML = "No Playlist Selected"
    }
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00"
}

async function displayAlbums() {
    let a = await fetch(`songs/audio/`);
    let response = await a.text();
    let div = document.createElement("div")
    div.innerHTML = response;
    let anchors = div.getElementsByTagName("a")
    let cardContainer = document.querySelector(".cardContainer")

    let array = Array.from(anchors)
    for (let index = 0; index < array.length; index++) {
        const e = array[index];


        if (e.href.includes("%5Csongs")) {
            let folder = decodeURIComponent(e.href)
                .replace(/^\/+|\/+$/g, "")   // remove starting & ending slash
                .split("\\")
                .pop();


            //Get the metadata of the folder
            let a = await fetch(`songs/audio/${folder}/info.json`);
            let response = await a.json();
            // console.log(response);
            cardContainer.innerHTML = cardContainer.innerHTML +
                `<div data-folder="${folder}" class="card">
                        <div class="play">
                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="11" fill="#1ed760" />
                                <polygon points="9,7 17,12 9,17" fill="#000000" />
                            </svg>
                        </div>
                        <img class="playbtnimg" src="songs/audio/${folder}/cover.jpg" alt="">
                        <h2>${response.title}</h2>
                        <p>${response.description}</p>
                </div>`
        }
    }

    //Load the playlist whenever the card is clicked
    Array.from(document.getElementsByClassName("card")).forEach((e) => {
        // console.log(e);

        e.addEventListener("click", async item => {
            songs = await getSongs(`${item.currentTarget.dataset.folder}`)
            playMusic(songs[0]);

        })
    })
}

async function main() {
    // Get the list  of all the songs
    await getSongs("Best of Hollywood")
    playMusic(songs[0], true)


    //Display all the albums on the page
    displayAlbums()


    //Attach an event listner to play, next and previous
    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play()
            play.src = "images_and_icons/pause.svg"

        }
        else {
            currentSong.pause()
            play.src = "images_and_icons/play.svg"
        }
    }
    )

    //Listen for timeupdate event 
    // Update UI as song plays
    currentSong.addEventListener("timeupdate", () => {

        // Show current time and total duration in console
        // console.log(currentSong.currentTime, currentSong.duration);

        // Display formatted time (mm:ss / mm:ss)
        document.querySelector(".songtime").innerHTML =
            `${secondsToMinutesSeconds(currentSong.currentTime)}/${secondsToMinutesSeconds(currentSong.duration)}`;

        //Autoplay next song    
        if (currentSong.currentTime == currentSong.duration) {
            let index = songs.indexOf(decodeURI(currentSong.src).split(/[/\\]/).pop())
            playMusic(songs[index + 1])
        }


        // Move circle along seekbar based on playback progress
        document.querySelector(".circle").style.left =
            (currentSong.currentTime / currentSong.duration) * 100 + "%";
    });


    //Add an event listner to seekbar
    // Handle clicks on seekbar
    document.querySelector(".seekbar").addEventListener("click", e => {

        // Find click position as percentage of seekbar width
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;

        // Move circle to that percentage
        document.querySelector(".circle").style.left = percent + "%";

        // Jump song to that percentage of total duration
        currentSong.currentTime = (currentSong.duration * percent) / 100;
    });

    //Add an event listner to hamburger
    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0"
    })

    //Add an event listner to close
    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-130%"
    })

    //Add an event listner to previous
    previous.addEventListener("click", () => {
        console.log("pre");

        let index = songs.indexOf(decodeURI(currentSong.src).split(/[/\\]/).pop())

        if ((index - 1) >= 0) {
            playMusic(songs[index - 1])
        }

    })

    //Add an event listner to next
    next.addEventListener("click", () => {
        currentSong.pause();
        console.log("next");

        let index = songs.indexOf(decodeURI(currentSong.src).split(/[/\\]/).pop())

        if ((index + 1) < songs.length) {
            playMusic(songs[index + 1])
        }
    })



    //Add an event listner to volume
    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e) => {
        console.log("Setting volume to :", e.target.value, "/ 100");
        currentSong.volume = parseInt(e.target.value) / 100
        if (currentSong.volume > 0) {
            document.querySelector(".volume>img").src = document.querySelector(".volume>img").src.replace("images_and_icons/mute.svg", "images_and_icons/volume.svg")
        }
        else{
            document.querySelector(".volume>img").src = document.querySelector(".volume>img").src.replace("images_and_icons/volume.svg", "images_and_icons/mute.svg")
        }
    })

    //Add an event listner to mute the track
    document.querySelector(".volume>img").addEventListener("click", e => {
        if (e.target.src.includes("images_and_icons/volume.svg")) {
            e.target.src = e.target.src.replace("images_and_icons/volume.svg", "images_and_icons/mute.svg")
            currentSong.volume = 0;
            document.querySelector(".range").getElementsByTagName("input")[0].value = 0;
        } else {
            e.target.src = e.target.src.replace("images_and_icons/mute.svg", "images_and_icons/volume.svg")
            currentSong.volume = 0.1;
            document.querySelector(".range").getElementsByTagName("input")[0].value = 10;
        }

    })

}
main()