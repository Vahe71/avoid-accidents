const game = document.querySelector('.game');
const crash1 = document.querySelector('.game .chanaparh .crash1');
const crash2 = document.querySelector('.game .chanaparh .crash2');
const crash3 = document.querySelector('.game .chanaparh .crash3');
const globalCrash = document.querySelectorAll('.game .chanaparh .crash');
const car = document.querySelector('.game .chanaparh .car');
const road1 = document.querySelector('.game .chanaparh .road1');
const road3 = document.querySelector('.game .chanaparh .road3');
const displayTime = document.querySelector('.displayTime');
const playButton = document.querySelector('.game .menu .play');
const startMenu = document.querySelector('.game .menu');
const selectMenu = document.querySelector('.game .selectCars');
const selectCars = document.querySelectorAll('.game .selectCars .car');
const carSkin = document.querySelector('.game .chanaparh .car img');
const selectCarButton = document.querySelector('.game .menu .select');
const selectCarButtonH1 = document.querySelector('.game .menu .select h1');
const crashDisplay = document.querySelector('.game .displayCrash');
let selected = false;
displayTime.innerText = `Record ${localStorage.getItem('Record Time')} sec.`;
displayTime.onclick = () => {
    localStorage.removeItem('Record Time');
    displayTime.innerText = `Record 0 sec.`;
}
localStorage.getItem('Record Time') == null ? displayTime.innerText = `Record 0 sec.` : '';
selectCarButton.onclick = () => {
    selectMenu.style.bottom = '100px';
    for (let i = 0; i < selectCars.length; i++) {
        selectCars[i].onclick = () => {
            carSkin.src = selectCars[i].src;
            selectMenu.style.bottom = '-150px';
            car.style = 'z-index: 10; transform: scale(0.7)';
            selectCarButton.style = 'color: green;';
            selectCarButtonH1.innerText = 'SELECTED';
            selected = true;
        }
    }
}
playButton.onclick = () => {
    if (selected) {
        startMenu.style.bottom = '-100%';
        car.style = 'transform: none; bottom: 30px; z-index: 11;';
        setInterval(() => {
            if (
                crash1.offsetTop + crash1.offsetHeight >= car.offsetTop && car.offsetLeft < crash1.offsetLeft + crash1.offsetWidth && crash1.offsetTop <= car.offsetTop + car.offsetHeight && crash1.offsetLeft < car.offsetLeft + car.offsetWidth || crash2.offsetTop + crash2.offsetHeight >= car.offsetTop && car.offsetLeft < crash2.offsetLeft + crash2.offsetWidth && crash2.offsetTop <= car.offsetTop + car.offsetHeight && crash2.offsetLeft < car.offsetLeft + car.offsetWidth || crash3.offsetTop + crash3.offsetHeight >= car.offsetTop && car.offsetLeft < crash3.offsetLeft + crash3.offsetWidth && crash3.offsetTop <= car.offsetTop + car.offsetHeight && crash3.offsetLeft < car.offsetLeft + car.offsetWidth) {
                crashDisplay.style.bottom = '10px';
                clearInterval(setCrash);
                clearInterval(displayTimeSet);
                clearInterval(setCheck);
                crashDisplay.onclick = () => {
                    crashDisplay.style.bottom = '-100%';
                    window.location.reload();
                }
            } 
        });
        let leftCurrent = 203;
        car.style.left = `${leftCurrent}px`;
        let speedCurrent = 5;
        document.onkeydown = e => {
            if (e.which == 37) { // left
                if (leftCurrent >= 0) {
                    leftCurrent -= speedCurrent;
                    car.style.left = `${leftCurrent}px`;
                }
            } else if (e.which == 39) { // right
                if (leftCurrent < game.offsetWidth - car.offsetWidth - 20) {
                    leftCurrent += speedCurrent;
                    car.style.left = `${leftCurrent}px`;
                }
            }
        }
        let roadSpeed = 1;
        let dropSpeed = 5000;
        let crashSpeed = 8;
        setInterval(() => {
            if (dropSpeed > 2500) {
                dropSpeed -= 100;
            }
            if (crashSpeed > 2.3) {
                crashSpeed -= 0.3;
                speedCurrent += 1.5;
            }
            if (roadSpeed > 0.4) {
                roadSpeed -= 0.05;
            }
            road1.style.animation = `road ${roadSpeed}s linear infinite forwards`;
            road3.style.animation = `road ${roadSpeed}s linear infinite forwards`;
        }, 3000);
        let setCrash = setInterval(() => { 
            let x = Math.floor(Math.random() * 3);
            if (globalCrash[0].offsetTop == -100) { 
                globalCrash[0].style.left = car.offsetLeft + 'px';
            } 
            if (globalCrash[1].offsetTop == -100) { 
                globalCrash[1].style.left = car.offsetLeft + 'px';
            } 
            if (globalCrash[2].offsetTop == -100) { 
                globalCrash[2].style.left = car.offsetLeft + 'px';
            }
            console.log(car.offsetLeft)
            console.log(x);
            globalCrash[x].style.top = '630px';
        }, dropSpeed);
        let setCheck = setInterval(() => {
            for (let i = 0; i < globalCrash.length; i++) {
                if (globalCrash[i].offsetTop == 630) {
                    globalCrash[i].style.transition = 'none';
                    globalCrash[i].style.top = '-100px';
                } else if (globalCrash[i].offsetTop == -100) {
                    crash1.style.transition = `top ${crashSpeed}s linear`;
                    crash2.style.transition = `top ${crashSpeed}s linear`;
                    crash3.style.transition = `top ${crashSpeed}s linear`;
                } 
            }
        }, 100);
        let displayTimeCurrent = 0;
        let displayTimeSet = setInterval(() => {
            displayTimeCurrent++;
            if (displayTimeCurrent > localStorage.getItem('Record Time')) {
                localStorage.setItem('Record Time', displayTimeCurrent);
            }
            displayTime.innerText = displayTimeCurrent + ' sec.';
        }, 1000);    
    } else {
        selectCarButton.style = 'color: red;';
    }
}



    




