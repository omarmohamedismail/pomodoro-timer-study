let studyTime = 50 * 60;
let breakTime = 10 * 60;
let timeLeft = studyTime;
let isStudy = true;
let timer = null;

const timeEl = document.getElementById("time");
const modeEl = document.getElementById("mode");
const emojiEl = document.getElementById("emoji");
const colorPicker = document.getElementById("colorPicker");
const emojiPicker = document.getElementById("emojiPicker");
const soundPicker = document.getElementById("soundPicker");

function updateDisplay() {
  const m = Math.floor(timeLeft / 60);
  const s = timeLeft % 60;
  timeEl.textContent = `${m}:${s < 10 ? "0" : ""}${s}`;
}

function playSound() {
  document.getElementById(soundPicker.value).play();
}

function startTimer() {
  if (timer) return;
  timer = setInterval(() => {
    timeLeft--;
    updateDisplay();

    if (timeLeft <= 0) {
      clearInterval(timer);
      timer = null;
      playSound();

      isStudy = !isStudy;
      if (isStudy) {
        modeEl.textContent = "Study Time";
        timeLeft = studyTime;
      } else {
        modeEl.textContent = "Break Time";
        timeLeft = breakTime;
      }
      updateDisplay();
      startTimer();
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timer);
  timer = null;
}

function resetTimer() {
  pauseTimer();
  isStudy = true;
  timeLeft = studyTime;
  modeEl.textContent = "Study Time";
  updateDisplay();
}

colorPicker.addEventListener("input", e => {
  document.body.style.background =
    `linear-gradient(135deg, ${e.target.value}, #020617)`;
});

emojiPicker.addEventListener("change", e => {
  emojiEl.textContent = e.target.value;
});

updateDisplay();
