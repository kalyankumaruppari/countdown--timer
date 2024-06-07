window.onload = () => {
    document.querySelector('#calculate').onclick = calculate;
    document.querySelector('#pause').onclick = pause;
    document.querySelector('#resume').onclick = resume;
    document.querySelector('#reset').onclick = reset;

    document.querySelector('#stop').onclick = () => {
        clearInterval(interval);
    };
}

let interval;
let endTime;
let paused = false;
let remainingTime;

function calculate() {
    const date = document.querySelector("#date").value;
    const time = document.querySelector("#time").value;
    
    endTime = new Date(date + " " + time);

    interval = setInterval(() => calculateTime(endTime), 1000);
}

function calculateTime(endTime) {
    if (!paused) {
        const currentTime = new Date();
        const days = document.querySelector('#countdown-days');
        const hours = document.querySelector('#countdown-hours');
        const minutes = document.querySelector('#countdown-minutes');
        const seconds = document.querySelector('#countdown-seconds');

        if (endTime > currentTime) {
            remainingTime = (endTime - currentTime) / 1000;
            days.innerText = Math.floor(remainingTime / (24 * 60 * 60));
            hours.innerText = Math.floor((remainingTime / (60 * 60)) % 24);
            minutes.innerText = Math.floor((remainingTime / 60) % 60);
            seconds.innerText = Math.floor(remainingTime % 60);
        } else {
            clearInterval(interval);
            document.querySelector('#alarm-sound').play();
            reset();
        }
    }
}

function pause() {
    paused = true;
    clearInterval(interval);
}

function resume() {
    paused = false;
    endTime = new Date(new Date().getTime() + remainingTime * 1000);
    interval = setInterval(() => calculateTime(endTime), 1000);
}

function reset() {
    clearInterval(interval);
    document.querySelector('#countdown-days').innerText = 0;
    document.querySelector('#countdown-hours').innerText = 0;
    document.querySelector('#countdown-minutes').innerText = 0;
    document.querySelector('#countdown-seconds').innerText = 0;
}
