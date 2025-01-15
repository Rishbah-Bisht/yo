
const playlistItems = document.querySelectorAll(".playlistInnerDivs");
const playButton = document.getElementById('play');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const audio = document.getElementById('audio');
const progressBar = document.getElementById('progress-bar');
const volumeBar = document.getElementById('volume-bar');
const muteButton = document.getElementById('mute');
const songTitle = document.querySelector('#SongName');
const artist = document.querySelector('#artistName');
const currentTimeElement = document.getElementById('current-time');
const durationElement = document.getElementById('duration');
const songPicture = document.querySelector("#songImgDesplay");
const songTime = document.querySelector("#songTime");
const leftside = document.querySelector('#leftside');
const left_div = document.querySelector('.leftSide');
const mutebtn = document.querySelector('#mute')
const album_divs = document.querySelector('.album')
const song_info = document.querySelector('.song-info')




const credit_2 = document.querySelector('#singer');
const credit_4 = document.querySelector('#art');
const singer_1 = document.querySelector('#singer_1');
const art_1 = document.querySelector('#art_1');
const display_none = document.querySelectorAll('.display_none');
const display_none_art = document.querySelectorAll('.display_none_art');
Array.from(display_none);
Array.from(display_none_art);
const display_none_1 = document.querySelectorAll('.display_none_1');
const display_none_art_2 = document.querySelectorAll('.display_none_art_2');
Array.from(display_none_1);
Array.from(display_none_art_2);
const left_songName = document.querySelector("#SongName-left");
const left_artistNamw = document.querySelector('#artistName-left');
const left_duration = document.querySelector('#time-left')
let currentSongIndex = 0; // Tracks the current song index
const songImgDesplay_q = document.querySelector('#songImgDesplay_q');
const SongName_q = document.querySelector('#SongName_q');
const artistName_q = document.querySelector('#artistName_q');
const headr_name = document.querySelector('#headr_name');










function changeBackgroundColor(imageUrl) {
    const img = new Image();

    img.crossOrigin = "anonymous";  // Allow CORS if needed

    img.src = imageUrl;

    img.onload = function () {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;

        // Draw the image onto the canvas
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Get image data (pixel data)
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;

        let r = 0, g = 0, b = 0;
        let count = 0;

        // Calculate the average color
        for (let i = 0; i < pixels.length; i += 4) {
            r += pixels[i];       // Red
            g += pixels[i + 1];   // Green
            b += pixels[i + 2];   // Blue
            count++;
        }

        // Average out the colors and adjust them for visibility
        r = Math.floor(r / count + 20);
        g = Math.floor(g / count + 25);
        b = Math.floor(b / count + 45);

        const color = `rgb(${r}, ${g}, ${b})`;

        // Check if left_div exists before applying the background color
        if (left_div) {
            left_div.style.background = ` linear-gradient(to bottom, ${color}, rgba(0, 0, 0, 0.75))`;


        } else {
            console.error('left_div not found!');
        }
    };

    img.onerror = function () {
        console.error('Failed to load image for color extraction');
    };
}



function que(index) {
    const selectedSong = playlistItems[index + 1];
    const audioSrc = selectedSong.getAttribute("src");
    const songImg = selectedSong.querySelector("img").getAttribute("src") || "default.jpg";
    const songName = selectedSong.querySelector(".SongName").textContent;
    const artistName = selectedSong.querySelector(".artistName").textContent;
    songImgDesplay_q.src = songImg;
    SongName_q.textContent = songName;
    artistName_q.textContent = artistName;

}


function loadContent(index) {
    const selectedSong = playlistItems[index];
    const audioSrc = selectedSong.getAttribute("src");
    const songImg = selectedSong.querySelector("img").getAttribute("src") || "default.jpg";
    const songName = selectedSong.querySelector(".SongName").textContent;
    const artistName = selectedSong.querySelector(".artistName").textContent;
    audio.src = audioSrc;
    songPicture.src = songImg;
    songTitle.textContent = songName;
    artist.textContent = artistName;
    left_songName.textContent = songName;
    left_artistNamw.textContent = artistName;
    leftside.src = songImg;
    credit_2.textContent = display_none[index].textContent;
    credit_4.textContent = display_none_art[index].textContent
    singer_1.textContent = display_none_1[index].textContent;
    art_1.textContent = display_none_art_2[index].textContent
    headr_name.textContent = songName;
    changeBackgroundColor(songImg)
}

// Load a song by index
function loadSong(index) {

    loadContent(index);
    que(index);
    highlightActiveSong(index);
    // Wait for metadata to load before starting playback
    audio.addEventListener('loadedmetadata', () => {
        durationElement.textContent = formatTime(audio.duration);
        progressBar.value = 0; // Reset progress bar
    });

    // Automatically start playback after loading metadata
    audio.play().then(() => {
        playButton.innerHTML = '<i class="fa-solid fa-pause" style="color: #ffffff;"></i>'; // Pause icon
    }).catch((error) => {

        playButton.innerHTML = '<i class="fa-solid fa-play" style="color: #ffffff;"></i>'; // Play icon
    });
}










// Highlight the currently playing song
function highlightActiveSong(index) {
    playlistItems.forEach((item, i) => {
        item.classList.toggle("active", i === index);
    });
}

// Play/Pause toggle
// Play/Pause toggle
function togglePlayPause() {
    if (audio.paused) {
        audio.play().then(() => {
            playButton.innerHTML = '<i class="fa-solid fa-pause" style="color: #ffffff;"></i>'; // Pause icon
        }).catch((error) => {
            console.error("Playback failed:", error);
            playButton.innerHTML = '<i class="fa-solid fa-play" style="color: #ffffff;"></i>'; // Play icon (fallback)
        });
    } else {
        audio.pause();
        playButton.innerHTML = '<i class="fa-solid fa-play" style="color: #ffffff;"></i>'; // Play icon
    }
}



// Navigate between songs
function changeSong(direction) {
    currentSongIndex += direction;
    if (currentSongIndex < 0) currentSongIndex = playlistItems.length - 1;
    if (currentSongIndex >= playlistItems.length) currentSongIndex = 0;
    playButton.innerHTML = '<i class="fa-solid fa-play" style="color: #ffffff;"></i>';
    loadSong(currentSongIndex);
}

// Update progress bar
function updateProgressBar() {
    if (audio.duration) {
        progressBar.value = (audio.currentTime / audio.duration) * 100;
        currentTimeElement.textContent = formatTime(audio.currentTime);
        durationElement.textContent = formatTime(audio.duration);
        const progress = (audio.currentTime / audio.duration) * 100;
        progressBar.value = progress;
        progressBar.style.background = `linear-gradient(to right, #FA586A ${progress}%, #ccc ${progress}%)`;
    }
}


// Seek the audio
function seekAudio(event) {
    const tempSliderValue = event.target.value;
    const seekTime = (progressBar.value / 100) * audio.duration;
    audio.currentTime = seekTime;
    // Update slider background dynamically
    const progress = (tempSliderValue / progressBar.max) * 100;
    progressBar.style.background = `linear-gradient(to right, #FA586A${progress}%, #ccc ${progress}%)`;
}

// Format time (seconds to mm:ss)
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60) || 0;
    const secs = Math.floor(seconds % 60) || 0;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

// Mute/Unmute audio
function toggleMute(mutebtnbtn) {
    audio.muted = !audio.muted;
    if (audio.muted) {
        mutebtn.innerHTML = '<i class="fa-solid fa-volume-xmark" style="color: #ffffff;"></i>';
        volumeBar.value = 0;
        volumeBar.style.background = `linear-gradient(to right,#FA586A${0}%, #ccc ${0}%)`;

    }
    else {
        mutebtn.innerHTML = '<i class="fa-solid fa-volume-low" style="color: #ffffff;"></i>';
        volumeBar.value = 0.5;
        const progress = (volumeBar.value / volumeBar.max) * 100;
        volumeBar.style.background = `linear-gradient(to right,#FA586A ${progress}%, #ccc ${progress}%)`;

    }
}

// Update volume
function updateVolume(event, mutebtn) {
    const tempSliderValue = event.target.value;
    const progress = (tempSliderValue / volumeBar.max) * 100;
    audio.volume = volumeBar.value;
    volumeBar.style.background = `linear-gradient(to right, #FA586A ${progress}%, #ccc ${progress}%)`;
    if (audio.volume == 0) {
        mutebtn.innerHTML = '<i class="fa-solid fa-volume-xmark" style="color: #ffffff;"></i>';
    }
}
function loopPlaylist() {
    currentSongIndex = (currentSongIndex + 1) % playlistItems.length;
    loadSong(currentSongIndex);
}
// Event listeners
playButton.addEventListener('click', togglePlayPause);
prevButton.addEventListener('click', () => changeSong(-1));
nextButton.addEventListener('click', () => changeSong(1));
progressBar.addEventListener('input', seekAudio);
audio.addEventListener('timeupdate', updateProgressBar);
audio.addEventListener('ended', loopPlaylist);
muteButton.addEventListener('click', toggleMute);
volumeBar.addEventListener('input', updateVolume);



const footer = document.querySelector('#footerPart');
const yo = document.querySelector('.playlist');
const xo = document.querySelector('#playlist');
const pad_1 = document.querySelector('.head');
const x = document.querySelector('#x');
const leader = document.querySelector('#leader');
const mainSecyionMusicLibary = document.querySelector('.mainSecyionMusicLibary');



















playlistItems.forEach((item, index) => {
    item.addEventListener("click", () => {
        currentSongIndex = index; // Update current index
        loadSong(currentSongIndex);
        song_info.style.opacity = 1;
        
        btnsShow.style.display = 'flex'
        leader.style.fontSize = '4rem';
        pad_1.style.paddingLeft = '20px';
        mainSecyionMusicLibary.style.height = '79%';

    });

});



const btnsShow=document.querySelector('.btnsShow');

btnsShow.addEventListener('click' ,()=>{
    xo.style.display = 'none'
    left_div.style.display = 'flex';
    btnsShow.style.display = 'none';
    console.log('hiii')
    yo.style.display = ''
    footer.style.display = 'flex';
    footer.style.bottom = '0px';
    console.log(footer)
     shoeFooter.style.display = 'none'
})









const crossbtn = document.querySelector('.crossbtn');
const shoeFooter=document.querySelector('.shoeFooter');
crossbtn.addEventListener('click', () => {
    xo.style.display = 'flex'
     yo.style.display = ''
    yo.style.width = '100%';
    btnsShow.style.display = 'flex';
    left_div.style.display = 'none';
    leader.style.fontSize = '';
    shoeFooter.style.display = ''
})




const searchbtn=document.querySelector('#searchbtn');
const navMiddelPart=document.querySelector('#navMiddelPart');
searchbtn.addEventListener('click',()=>{
    navMiddelPart.style.display='flex';
})

xo.addEventListener('click', function () {
    navMiddelPart.style.display='none';
});





const scrollContainers = document.querySelectorAll('.scroll-container'); // NodeList for all scroll containers
const scrollLeftButtons = document.querySelectorAll('.scroll-left'); // NodeList for all scroll-left buttons
const scrollRightButtons = document.querySelectorAll('.scroll-right'); // NodeList for all scroll-right buttons

// Apply event listeners to each scroll-left button
scrollLeftButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        // Scroll the corresponding scroll-container element
        scrollContainers[index].scrollBy({
            left: -200, // Scroll 200px to the left
            behavior: 'smooth' // Smooth scrolling
        });
    });
});

// Apply event listeners to each scroll-right button
scrollRightButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        // Scroll the corresponding scroll-container element
        scrollContainers[index].scrollBy({
            left: 200, // Scroll 200px to the right
            behavior: 'smooth' // Smooth scrolling
        });
    });
});









// Get the search input field and playlist items
const searchBox = document.getElementById('searchBox');
const playlist = document.getElementById('playlist');
const head = document.querySelectorAll(".head"); // Assuming .head is used for header rows
// Assuming the song divs are inside the playlist div
const search_filter=document.querySelectorAll('.search_filter')
// Add an event listener for live search
searchBox.addEventListener('input', () => {
    const searchTerm = searchBox.value.toLowerCase(); // Get the input and convert to lowercase

    // Hide all header rows
    head.forEach((item) => {
        item.style.display = 'none';
    });

    // Loop through all songs
    search_filter.forEach((song) => {
        const songName = song.querySelector('.SongName').innerText.toLowerCase();
        const artistName = song.querySelector('.artistName').innerText.toLowerCase();

        // Check if the search term matches the song or artist name
        if (songName.includes(searchTerm) || artistName.includes(searchTerm)) {
            song.style.display = ''; // Show matching song
        } else {
            song.style.display = 'none'; // Hide non-matching song
        }
    });
});


document.addEventListener('keypress', function (event) {
    if (event.key === ' ') {  // Space bar character
        console.log('Space key pressed!');
        event.preventDefault();
        togglePlayPause();
    }
});



const cross=document.querySelector('#cross');
const popUp=document.querySelector('#popUp');
cross.addEventListener('click',()=>{
    searchBox.value='';
    popUp.style.display='flex'
})
