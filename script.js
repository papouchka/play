let now_playing = document.querySelector('.now-playing');
let track_art = document.querySelector('.track-art');
let track_name = document.querySelector('.track-name');
let track_artist = document.querySelector('.track-artist');

let playpause_btn = document.querySelector('.playpause-track');
let next_btn = document.querySelector('.next-track');
let prev_btn = document.querySelector('.prev-track');

let seek_slider = document.querySelector('.seek_slider');
let volume_slider = document.querySelector('.volume_slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let wave = document.getElementById('wave');
let randomIcon = document.querySelector('.fa-random');
let curr_track = document.createElement('audio');
let flip = document.getElementById('flip');
let track_index = 0;
let circle = document.querySelector('.circle');
let isPlaying = false;
let isRandom = false;
let updateTimer;
 

const music_list = [
    {
        img : 'images/koukou2.jpg',
        name : 'رايقة🥺❤️',
        artist : 'Ayoub🎵, My Darling',
        music : 'music/ukulele.mp3'
    },
    {
        img : 'images/koukou1.jpg',
        name : 'لو تطلب نجمه⭐💞',
        artist : 'Ayoub🎵, My Life',
        music : 'music/ukulele2.mp3'
    },
    {
        img : 'images/koukou3.jpg',
        name : 'ايامي معاك💜💦',
        artist : 'Ayoub🎵, My Heart',
        music : 'music/ukulele3.mp3'
    },
    {
        img : 'images/koukou4.jpg',
        name : 'كان يا ما كان❤️‍🩹🤍',
        artist : 'Ayoub🎵, My soul',
        music : 'music/ukulele4.mp3'
    },
    {
        img : 'images/koukou5.jpg',
        name : 'خلصانة الحكاية😞💔',
        artist : 'Ayoub🎵, My love ',
        music : 'music/ukulele5.mp3'
    },
    {
        img : 'images/koukou6.jpg',
        name : 'فاكر زمان😫🕒',
        artist : 'Ayoub🎵, Sweetheart',
        music : 'music/ukulele6.mp3'
    },
    {
        img : 'images/koukou7.jpg',
        name : ' بيني و بينك😊💝',
        artist : 'Ayoub🎵, My Queen',
        music : 'music/ukulele7.mp3'
    },
    {
        img : 'images/koukou8.jpg',
        name : 'عليكي عيون👁️😘',
        artist : 'Ayoub🎵, My Wife',
        music : 'music/ukulele8.mp3'
    },
    {
        img : 'images/koukou9.jpg',
        name : 'على بالي💬💙',
        artist : 'Ayoub🎵, My Mind',
        music : 'music/ukulele9.mp3'
    },
    {
        img : 'images/koukou10.jpg',
        name : 'يا طالعين القمر🌕✨ ',
        artist : 'Ayoub🎵, My Moon',
        music : 'music/ukulele10.mp3'
    },
    {
        img : 'images/koukou11.jpg',
        name : 'بمووت جوايا❤️‍🔥💘 ',
        artist : 'Ayoub🎵, My Sushine',
        music : 'music/ukulele11.mp3'
    }, 
    {
        img : 'images/koukou12.jpg',
        name : 'خليني ذكرى📜 ',
        artist : 'Ayoub🎵, My Memories',
        music : 'music/ukulele12.mp3'
    }, 
    {
        img : 'images/koukou13.jpg',
        name : 'هموت من غيرها😫💥 ',
        artist : 'Ayoub🎵, My Dear',
        music : 'music/ukulele13.mp3'
    },
    {
        img : 'images/koukou14.jpg',
        name : 'غادي تبقاي فقلبي💍💖 ',
        artist : 'Ayoub🎵, My Eyes',
        music : 'music/ukulele14.mp3'
    },
    {
        img : 'images/koukou15.jpg',
        name : ' بحبك وحشتيني😫😪',
        artist : 'Ayoub🎵, My Daughter',
        music : 'music/ukulele15.mp3'
    },
];

loadTrack(track_index);

function loadTrack(track_index){
    clearInterval(updateTimer);
    reset();

    curr_track.src = music_list[track_index].music;
    curr_track.load();

    track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")";
    track_name.textContent = music_list[track_index].name;
    track_artist.textContent = music_list[track_index].artist;
    now_playing.textContent = "Playing music " + (track_index + 1) + " of " + music_list.length;

    updateTimer = setInterval(setUpdate, 1000);

    curr_track.addEventListener('ended', nextTrack);
}


function reset(){
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}
function randomTrack(){
    isRandom ? pauseRandom() : playRandom();
    
}
function playRandom(){
    isRandom = true;
    randomIcon.classList.add('randomActive');
    randomIcon.innerHTML = '';
    circle.style.background="#fff"
    
}
function pauseRandom(){
    isRandom = false;
    randomIcon.classList.remove('randomActive');
    circle.style.background=""
}
function repeatTrack(){
    let current_index = track_index;
    loadTrack(current_index);
    playTrack();
}
function playpauseTrack(){
    isPlaying ? pauseTrack() : playTrack();
}
function playTrack(){
    curr_track.play();
    isPlaying = true;
    track_art.classList.add('rotate');
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}
function pauseTrack(){
    curr_track.pause();
    isPlaying = false;
    track_art.classList.remove('rotate');
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}
function nextTrack(){
    
    if(track_index < music_list.length - 1 && isRandom === false){
        track_index += 1;
    }else if(track_index < music_list.length - 1 && isRandom === true){
        let random_index = Number.parseInt(Math.random() * music_list.length);
        track_index = random_index;
    }else{
        track_index = 0;
    }
    loadTrack(track_index);
    playTrack();
    
}
function prevTrack(){
    if(track_index > 0){
        track_index -= 1;
    }else{
        track_index = music_list.length -1;
    }
    loadTrack(track_index);
    playTrack();
}
function seekTo(){
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}
function setVolume(){
    curr_track.volume = volume_slider.value / 100;
}
function setUpdate(){
    let seekPosition = 0;
    if(!isNaN(curr_track.duration)){
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
        if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
        if(durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}
