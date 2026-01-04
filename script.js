let studyTime = 50 * 60; // 50 minutes
let breakTime = 10 * 60; // 10 minutes
let timeLeft = studyTime;
let isStudy = true;
let timer = null;

const timeEl = document.getElementById("time");
const modeEl = document.getElementById("mode");

function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timeEl.textContent =
    `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

function startTimer() {
  if (timer) return;

  timer = setInterval(() => {
    timeLeft--;
    updateDisplay();

    if (timeLeft <= 0) {
      clearInterval(timer);
      timer = null;

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

function resetTimer() {
  clearInterval(timer);
  timer = null;
  isStudy = true;
  timeLeft = studyTime;
  modeEl.textContent = "Study Time";
  updateDisplay();
}

updateDisplay();
