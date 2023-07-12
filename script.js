// Add your JavaScript here
/*Coded by Lil-Dino*/

// Function to handle the click event of a song in the hot-song div
function playSong(songElement) {
    var overlay = document.getElementById('overlay');
    var selectedSong = songElement.getAttribute('data-song');
    var selectedArtist = songElement.getAttribute('data-artist');
    var selectedImage = songElement.getAttribute('data-image');
    var selcectedSource = songElement.getAttribute('data-source');

    // Set the selected song and its attributes in the overlay
    var overlaySong = document.getElementById('overlay-song');
    overlaySong.textContent = selectedSong;

    var overlayArtist = document.getElementById('overlay-artist');
    overlayArtist.textContent = selectedArtist;

    var overlayImage = document.getElementById('overlay-image');
    overlayImage.src = selectedImage;

    // Show the overlay by sliding it up
    overlay.style.transform = 'translateY(-135%)';
    overlay.style.zIndex = '1';
    overlay.style.transition = 'transform .5s';

    //function to play and load the selected
    // Stop any currently playing song
    stopSong();

    // Load and play the selected song
    var audioPlayer = document.getElementById('audio-player');
    audioPlayer.src = selcectedSource;
    audioPlayer.play();

    // Change the fa-play icon to fa-pause
    var playIcon = document.getElementById('play-icon');
    playIcon.className = 'fa fa-pause';

    // Rotate the image while the song is playing
    overlayImage.classList.add('rotate');

    // Update the end time of the selected song
    audioPlayer.addEventListener('loadedmetadata', function () {
        var endCount = document.getElementById('endCount');
        var duration = formatTime(audioPlayer.duration);
        endCount.textContent = duration;
    });

    // Update the progressBar and startCount as the song progresses
    audioPlayer.addEventListener('timeupdate', function () {
        var progressBar = document.getElementById('progressBar');
        var startCount = document.getElementById('startCount');
        var progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progressBar.style.width = progress + '%';
        startCount.textContent = formatTime(audioPlayer.currentTime);
    });

    // Update the volume
    var volumeSlider = document.getElementById('volume');
    volumeSlider.addEventListener('input', function () {
        var volumeBar = document.getElementById('volumeBar');
        var volume = volumeSlider.value;
        audioPlayer.volume = volume / 100;
        volumeBar.style.width = volume + '%';
    });
}

// Function to format time in minutes and seconds
function formatTime(time) {
    var minutes = Math.floor(time / 60);
    var seconds = Math.floor(time % 60);
    var formattedTime = minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
    return formattedTime;
}

// Function to stop the currently playing song
function stopSong() {
    var audioPlayer = document.getElementById('audio-player');
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
}

    // Change the fa-play icon to fa-pause
    var playIcon = document.getElementById('play-icon');
    playIcon.className = 'fa fa-pause';



// Function to handle the click event of the fa-play/fa-pause icon
function togglePlayback() {
    var audioPlayer = document.getElementById('audio-player');

    // Check if the audio is currently playing
    if (audioPlayer.paused) {
        audioPlayer.play();
        // Change the fa-play icon to fa-pause
        this.className = 'fa fa-pause';

        // Rotate the image while the song is playing
        var overlayImage = document.getElementById('overlay-image');
        overlayImage.classList.add('rotate');
    } else {
        audioPlayer.pause();
        // Change the fa-pause icon to fa-play
        this.className = 'fa fa-play';

        // Stop rotating the image
        var overlayImage = document.getElementById('overlay-image');
        overlayImage.classList.remove('rotate');
    }
}
// Function to handle the click event of the fa-angle-down icon in the overlay
function hideOverlay() {
    var overlay = document.getElementById('overlay');

    // Hide the overlay by sliding it down
    overlay.style.transform = 'translateY(0%)';
    overlay.style.transition = 'transform .3s';
    overlay.style.zIndex = '1';


}


// Function to handle the click event of the fa-backward icon
function playPreviousSong() {
    // Stop the currently playing song
    stopSong();

    // Get the index of the current song
    var hotSongs = document.getElementsByClassName('hot-songs1');
    var currentIndex = -1;
    for (var i = 0; i < hotSongs.length; i++) {
        if (hotSongs[i].classList.contains('active')) {
            currentIndex = i;
            break;
        }
    }

    // Play the previous song if available
    if (currentIndex > 0) {
        hotSongs[currentIndex].classList.remove('active');
        hotSongs[currentIndex - 1].classList.add('active');
        playSong(hotSongs[currentIndex - 1]);
    }
}

// Function to handle the click event of the fa-forward icon
function playNextSong() {
    // Stop the currently playing song
    stopSong();

    // Get the index of the current song
    var hotSongs = document.getElementsByClassName('hot-songs1');
    var currentIndex = -1;
    for (var i = 0; i < hotSongs.length; i++) {
        if (hotSongs[i].classList.contains('active')) {
            currentIndex = i;
            break;
        }
    }

    // Play the next song if available
    if (currentIndex < hotSongs.length - 1) {
        hotSongs[currentIndex].classList.remove('active');
        hotSongs[currentIndex + 1].classList.add('active');
        playSong(hotSongs[currentIndex + 1]);
    }
}

// Function to handle the "ended" event of the audio player
function handleSongEnd() {
    // Play the next song
    playNextSong();
}

// Function to handle the change event of the volume range input
function adjustVolume() {
    var volume = document.getElementById('volume');
    var audioPlayer = document.getElementById('audio-player');
    audioPlayer.volume = volume.value / 100;
}

// Add event listeners to the necessary elements
document.addEventListener('DOMContentLoaded', function () {
    var hotSongs = document.getElementsByClassName('hot-songs1');
    for (var i = 0; i < hotSongs.length; i++) {
        hotSongs[i].addEventListener('click', function () {
            playSong(this);
        });
    }

    var downIcon = document.getElementById('down-icon');
    downIcon.addEventListener('click', hideOverlay);

    var playIcon = document.getElementById('play-icon');
    playIcon.addEventListener('click', togglePlayback);

    var backwardIcon = document.getElementById('backward-icon');
    backwardIcon.addEventListener('click', playPreviousSong);

    var forwardIcon = document.getElementById('forward-icon');
    forwardIcon.addEventListener('click', playNextSong);

    var volume = document.getElementById('volume');
    volume.addEventListener('input', adjustVolume);
});
// Add event listener for the "ended" event of the audio player
audioPlayer.addEventListener('ended', handleSongEnd);




// // Get references to the necessary elements
// const overlay = document.getElementById('overlay');
// const playBtn = document.querySelector('.fa-play');
// const image = document.querySelector('.overlay2 img');
// const title = document.querySelector('.overlay2 h2');
// const artist = document.querySelector('.overlay2 h4');
// const volumeRange = document.getElementById('volume');
// const startCount = document.getElementById('startCount');
// const endCount = document.getElementById('endCount');
// const backwardBtn = document.querySelector('.fa-backward');
// const forwardBtn = document.querySelector('.fa-forward');

// // Define the playlist of songs
// const playlist = [
//     {
//         title: "Jehovah 'Meliwo",
//         artist: "JUDIKAY FT 121-SELAH",
//         imageSrc: "https://www.ceenaija.com/wp-content/uploads/2023/04/Judikay-Jehovah-meliwo.jpg",
//         audioSrc: "https://files.ceenaija.com/wp-content/uploads/music/2023/04/Judikay_-_Jehovah_Meliwo_CeeNaija.com_.mp3"
//     },
//     // Add more songs to the playlist
//     {
//         title: "IBA",
//         artist: "Nathaniel Bassey",
//         imageSrc: "https://www.ceenaija.com/wp-content/uploads/2023/06/Nathaniel-Bassey-Iba-Ft.-Dunsin-Oyekan.jpg",
//         audioSrc: "https://files.ceenaija.com/uploads/music/2023/06/NATHANIEL-BASSEY-feat-Dunsin-Oyekan-Dasola-Akinbule-Iba-(CeeNaija.com).mp3"
//     },
//     // Add more songs to the playlist
//     {
//         title: "OWO OLUWA",
//         artist: "P.DANIEL Olawande",
//         imageSrc: "https://source.boomplaymusic.com/group10/M00/05/16/5afe19825f474895b7653bd81e63ebee_464_464.webp",
//         audioSrc: "https://files.ceenaija.com/wp-content/uploads/music/2023/05/P_Daniel_-_Owo_Oluwa_Ft_Nifemi_Olawande_CeeNaija.com_.mp3"
//     },
//     // Add more songs to the playlist
//     {
//         title: "IMELA",
//         artist: "MIN. QUEEN KEL",
//         imageSrc: "https://trendybeatz.com/images/Minister-Queen-Kel-Imela-Artwork.jpg",
//         audioSrc: "https://cdn.trendybeatz.com/audio/Minister-Queen-Kel-Imela-(TrendyBeatz.com).mp3"
//     },
//     // Add more songs to the playlist
//     {
//         title: "NOTHING",
//         artist: "MOSES BLISS",
//         imageSrc: "https://trendybeatz.com/images/Moses-Bliss-Nothing-Artwork.jpg",
//         audioSrc: "https://cdn.trendybeatz.com/audio/Moses-Bliss-Nothing-2-(TrendyBeatz.com).mp3"
//     },
//     // Add more songs to the playlist
//     {
//         title: "OH JESU",
//         artist: "TY BELLO",
//         imageSrc: "https://source.boomplaymusic.com/group10/M00/05/16/5afe19825f474895b7653bd81e63ebee_464_464.webp",
//         audioSrc: "https://files.ceenaija.com/wp-content/uploads/music/2023/05/TY_Bello_-_Oh_Jesu_CeeNaija.com_.mp3"
//     },
//     // Add more songs to the playlist
//     {
//         title: "YAH",
//         artist: "DUSIN OYEKAN",
//         imageSrc: "https://www.ceenaija.com/wp-content/uploads/2021/01/maxresdefault-85-640x360.jpg",
//         audioSrc: "https://www.ceenaija.com/wp-content/uploads/music/2021/01/Dunsin_Oyekan_-_YAH_CeeNaija.com_.mp3"
//     },
// ];

// let currentSongIndex = 0;
// let audio = new Audio();

// // Function to load and play the selected song
// function playSong(index) {
//     const song = playlist[index];
//     audio.src = song.audioSrc;
//     title.textContent = song.title;
//     image.src = song.imageSrc;
//     audio.play();
//     overlay.classList.add('playing');
// }

// // Function to pause the currently playing song
// function pauseSong() {
//     audio.pause();
//     image.classList.remove('rotate');
//     overlay.classList.remove('playing');
// }

// // Function to play the next song
// function playNextSong() {
//     pauseSong();
//     currentSongIndex = (currentSongIndex + 1) % playlist.length;
//     playSong(currentSongIndex);
// }

// // Function to play the previous song
// function playPreviousSong() {
//     pauseSong();
//     currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
//     playSong(currentSongIndex);
// }


// // Event listener for the play/pause button
// playBtn.addEventListener('click', function () {
//     if (audio.paused) {
//         playSong(currentSongIndex);
//     } else {
//         pauseSong();
//     }
// });

// // Event listener for the next button
// forwardBtn.addEventListener('click', playNextSong);

// // Event listener for the previous button
// backwardBtn.addEventListener('click', playPreviousSong);

// // Event listener for the volume range
// volumeRange.addEventListener('input', function () {
//     audio.volume = volumeRange.value / 100;
// });

// // Event listener for the time update of the audio
// audio.addEventListener('timeupdate', function () {
//     const currentTime = Math.floor(audio.currentTime);
//     const minutes = Math.floor(currentTime / 60);
//     const seconds = currentTime % 60;
//     startCount.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
// });

// // Event listener for the song ended event
// audio.addEventListener('ended', playNextSong);

// // Function to format the time in mm:ss format
// function formatTime(timeInSeconds) {
//     const minutes = Math.floor(timeInSeconds / 60);
//     const seconds = Math.floor(timeInSeconds % 60);
//     return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
// }

// // Function to load and play the selected song
// function playSong(index) {
//     const song = playlist[index];
//     audio.src = song.audioSrc;
//     title.textContent = song.title;
//     image.src = song.imageSrc;
//     audio.play();
//     image.classList.add('rotate');
//     overlay.classList.add('playing');


//     // Display total audio time
//     audio.addEventListener('loadedmetadata', function () {
//         const totalDuration = Math.floor(audio.duration);
//         endCount.textContent = formatTime(totalDuration);
//     });
// }

