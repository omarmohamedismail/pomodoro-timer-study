"use strict";

const STUDY_TIME = 50 * 60;
const BREAK_TIME = 10 * 60;

let timeLeft = STUDY_TIME;
let isStudy = true;
let timerId = null;

const timeEl = document.getElementById("time");
const modeEl = document.getElementById("mode");
const emojiEl = document.getElementById("emoji");

const colorPicker = document.getElementById("colorPicker");
const emojiPicker = document.getElementById("emojiPicker");
const soundPicker = document.getElementById("soundPicker");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");

function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timeEl.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function playSound() {
  const audio = document.getElementById(soundPicker.value);
  audio.currentTime = 0;
  audio.play().catch(() => {});
}

function switchMode() {
  isStudy = !isStudy;
  timeLeft = isStudy ? STUDY_TIME : BREAK_TIME;
  modeEl.textContent = isStudy ? "Study Time" : "Break Time";
}

function startTimer() {
  if (timerId !== null) return;

  timerId = setInterval(() => {
    timeLeft--;
    updateDisplay();

    if (timeLeft <= 0) {
      playSound();
      switchMode();
      updateDisplay();
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timerId);
  timerId = null;
}

function resetTimer() {
  pauseTimer();
  isStudy = true;
  timeLeft = STUDY_TIME;
  modeEl.textContent = "Study Time";
  updateDisplay();
}

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

colorPicker.addEventListener("input", e => {
  document.body.style.background =
    `linear-gradient(135deg, ${e.target.value}, #020617)`;
});

emojiPicker.addEventListener("change", e => {
  emojiEl.textContent = e.target.value;
});

updateDisplay();
