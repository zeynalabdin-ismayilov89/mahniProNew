const title=document.getElementById('title')
const artist=document.getElementById('artist')

const prevBtn = document.getElementById('prev')
const playBtn = document.getElementById('play')
const nextBtn = document.getElementById('next')

const currentTimeEl = document.getElementById('current-time')
const durationEl = document.getElementById('duration')
const progress = document.getElementById('progress')
const progressK = document.getElementById('progress-k')

const music = document.querySelector("audio")

const songs=[
    {
        name: 'ferhat-1',
        displayName:'Biri bana gelsin',
        artist:'Ferhat Gocer',
    },
    {
        name: 'namiq-1',
        displayName:'Yene qis geldi qonaq',
        artist:'Namiq Qaracuxurlu',
    },
    {
        name: 'nazperi-1',
        displayName:'Dilberim',
        artist:'Nazperi Dosteliyeva',
    },
    {
        name: 'roya-1',
        displayName:'Narin yagis',
        artist:'Roya Ayxan',
    },
    {
        name:'zulfiye-1',
        displayName:'esq',
        artist:'Zulfiye',
    },
]

let isPlaying=false

function playSong() {
    isPlaying=true
    playBtn.classList.replace('fa-play', 'fa-pause')
    music.play()
}


function pauseSong() {
    isPlaying=false
    playBtn.classList.replace('fa-pause', 'fa-play')
    music.pause()
}

playBtn.addEventListener('click', ()=>(isPlaying ? pauseSong() :playSong()))


function loadSong(song) {
    title.textContent = song.displayName
    artist.textContent = song.artist
    music.src = `music/${song.name}.mp3`
}

let songIndex = 0


function prevSong() {
    songIndex--

    if(songIndex <0) {
        songIndex = songs.length-1
    }
    loadSong(songs[songIndex])
    playSong()
}


function nextSong() {
    songIndex++

    if(songIndex > songs.length-1) {
        songIndex = 0
    }
    loadSong(songs[songIndex])
    playSong()
}

function updateProgressBar(e){
    if(isPlaying) {
        const {duration, currentTime} = e.srcElement

        const progressPercent = (currentTime /duration) *100
        progress.style.width = `${progressPercent}%`

        const durationMinutes = Math.floor(duration/60)
        let durationSeconds = Math.floor(duration % 60)

        if(durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`
        }
    
        if(durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`
        }
        const currentMinutes = Math.floor(currentTime/60)
        const currentSeconds = Math.floor(currentTime % 60)
    
        if(currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`
    
        }
    }
        function setProgresBar(e) {
            const width = this.clientWidth
            const clickX = e.offsetX
            const {duration } = music 
            music.currentTime = (clickX / width)*duration
        
        }
        
        
        


        prevBtn.addEventListener('click',prevSong)
        nextBtn.addEventListener('click', nextSong)

        music.addEventListener('timeupdate', updateProgressBar)

        progressContainer.addEventListener('click', setProgresBar)