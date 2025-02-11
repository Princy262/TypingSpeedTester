let body = document.querySelector("body");
let heading = document.querySelector("h1");
heading.style.color = 'black';

let parah = document.querySelector("#parah");
let input = document.querySelector(".input");
let mistake = document.querySelector("#mistake");

let timeTag = document.querySelector("#time");
let wpmTag = document.querySelector("#wpm");
let cpmTag = document.querySelector("#cpm");
let tryAgain = document.querySelector("#try");

let timer;
let maxTime = 60;
let timeLeft = maxTime;

let mist = 0;
let charIdx = 0;
let isTyping = false;

let l = paragraph.length;

const paraGen = () =>{
    let idx = Math.floor(Math.random() *l);

    console.log(idx);
    console.log(paragraph[idx]);
    parah.innerHTML = "";

    const charArr = paragraph[idx].split('');
 
    for(const char of charArr){
        let spanTag = `<span class="span">${char}</span`;
        parah.innerHTML += spanTag;
    }

    parah.getElementsByClassName('span')[0].classList.add('active');

    document.addEventListener('keydown', () =>{
        input.focus();
    });

    parah.addEventListener('click', () => {
        input.focus();
    });
};

function initTyping() {

    const chars = parah.getElementsByClassName('span');
    let typedchar = input.value.split('')[charIdx];

    if (charIdx < chars.length - 1 && timeLeft > 0) {
        if (isTyping == false) {
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }



        if (typedchar == null) {
            charIdx--;
            if (chars[charIdx].classList.contains('incorrect')) {
                mist--;
            }

            chars[charIdx].classList.remove('correct', 'incorrect');
        } 
        else {
            if (typedchar === chars[charIdx].innerText) {
                chars[charIdx].classList.add('correct');
            } else {
                mist++;
                chars[charIdx].classList.add('incorrect');
            }
            charIdx++;
        }

        console.log(typedchar);
        for (const span of chars) {
            span.classList.remove('active');
        }
        chars[charIdx].classList.add('active');

        let wpm = Math.round(((charIdx - mist) / 5) / (maxTime - timeLeft) * 60);

        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;

        wpmTag.innerText = wpm;
        mistake.innerText = mist;
        cpmTag.innerText = charIdx - mist;
    } 
    else {
        clearInterval(timer);
        input.value = "";
        alert("Time is over");
    }
}

function initTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timeTag.innerText = timeLeft;
    } else {
        clearInterval(timer);
    }
}

function resetGame() {
    paraGen();
    input.value = "";
    clearInterval(timer);
    timeLeft = maxTime;
    charIdx = mist = isTyping = 0;
    timeTag.innerText = timeLeft;
    wpmTag.innerText = 0;
    mistake.innerText = mist;
    cpmTag.innerText = 0;
}

paraGen();
input.addEventListener('input', initTyping);
tryAgain.addEventListener('click', resetGame);
