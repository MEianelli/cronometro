
let animation = true;
let currentTimeArray = [0, 0, 0, 0];
const miliseconds = 1000 / 10;
const hourDiv = document.querySelector('.hour');
const minDIv = document.querySelector('.min');
const secDiv = document.querySelector('.sec');
const miliDiv = document.querySelector('.mili');

function startAnimation() {



  if (animation) {
    updateTime();
    updateDisplay(currentTimeArray);
    setTimeout(() => {
      startAnimation();
    }, miliseconds);
  }
}

function updateTime() {
  currentTimeArray[3] -= 1;
  if (currentTimeArray[3] < 0) {
    currentTimeArray[3] = 9;
    currentTimeArray[2] -= 1;
    if (currentTimeArray[2] < 0) {
      currentTimeArray[2] = 59;
      currentTimeArray[1] -= 1;
      if (currentTimeArray[1] < 0) {
        currentTimeArray[1] = 59;
        currentTimeArray[0] -= 1;
        if (currentTimeArray[0] < 0) {
          animation = false;
        }
      }
    }
  }
}

const clear = document.querySelector('.clear');
clear.addEventListener('click', async () => {
  await clearButton();
})

async function clearButton() {
  animation = false;
  currentTimeArray = [0, 0, 0, 0];
  updateDisplay(currentTimeArray);
}

const stop = document.querySelector('.stop');
stop.addEventListener('click', () => {
  animation = false;
})


const start = document.querySelector('.start');
start.addEventListener('click', () => {
  currentTimeArray = getCurrentDisplayTime();
  animation = true;
  startAnimation();
});

const units = document.querySelectorAll('.unit');
units.forEach(e => {
  e.addEventListener('click', ({ target }) => {
    removeSelected();
    target.classList.add('selected');
  })
})

function removeSelected() {
  units.forEach(e => {
    e.classList.remove('selected')
  })
}

const input = document.querySelector('.tempoInput');
input.addEventListener('keyup', ({ target, keyCode }) => {
  let { value } = target;
  const currentUnit = document.querySelector('.selected').innerHTML;
  if (currentUnit === 'min') {
    value *= 60;
  }

  if (keyCode === 189) {
    input.value = '';
    return
  }
  if (value > 356399) {
    input.value = '';
    alert('Time cant exceed 99:59:59');
    return;
  }
  setTimer(value);
})

function setTimer(time) {
  const hour = Math.floor(time / 3600);
  const min = Math.floor(Math.floor(time % 3600) / 60);
  const sec = Math.floor(Math.floor(time % 3600) % 60);
  updateDisplay([hour, min, sec, 0]);
  return [hour, min, sec, 0];
}

const presets = document.querySelectorAll('.presets');
presets.forEach(e => {
  e.addEventListener('click', ({ target }) => {
    clearButton();
    const clickedPresetTime = getPresetTime(target);
    setTimer(clickedPresetTime * 60);
  });
})

function getPresetTime(target) {
  const text = target.innerHTML;
  if (text.length === 5) return +text.slice(0, 1)
  return +text.slice(0, 2);
}

const display = document.querySelector('.display');

function updateDisplay([hour, min, sec, mili]) {
  hour = ('00' + hour).slice(-2);
  min = ('00' + min).slice(-2);
  sec = ('00' + sec).slice(-2);
  hourDiv.innerHTML = hour;
  minDIv.innerHTML = min;
  secDiv.innerHTML = sec;
  miliDiv.innerHTML = mili;
}

const addtime = document.querySelectorAll('.addtime');
addtime.forEach(e => {
  e.addEventListener('click', ({ target }) => {
    let text = target.innerHTML;
    if (text.length === 8) {
      addTimeToDisplay(30);
    } else {
      addTimeToDisplay(60);
    }
  })
})

function addTimeToDisplay(time) {
  let currentDisplayTime = getCurrentDisplayTime();
  let [hour, min, sec, mili] = currentDisplayTime;
  let total = (hour * 60) + (min * 60) + sec;
  total += time;
  const currentTime = setTimer(total);
  if (animation) {
    currentTimeArray = currentTime;
  }
}

function getCurrentDisplayTime() {
  return [
    +hourDiv.innerHTML,
    +minDIv.innerHTML,
    +secDiv.innerHTML,
    +miliDiv.innerHTML
  ]
}