import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const dateInput = document.getElementById('datetime-picker');
const startButton = document.querySelector('[data-start]');
const countdownDisplay = document.querySelector('.timer');
const daysDisplay = countdownDisplay.querySelector('[data-days]');
const hoursDisplay = countdownDisplay.querySelector('[data-hours]');
const minutesDisplay = countdownDisplay.querySelector('[data-minutes]');
const secondsDisplay = countdownDisplay.querySelector('[data-seconds]');


let userSelectedDate = null;

flatpickr(dateInput, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];

    const currentDate = new Date();
    if (userSelectedDate <= currentDate) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
      });
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
});


function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor((ms % hour) / minute);
  const seconds = Math.floor((ms % minute) / second);

  return { days, hours, minutes, seconds };
}


function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}


let timerInterval = null;

startButton.addEventListener('click', () => {
  const targetDate = userSelectedDate;
  const currentTime = new Date();

  if (targetDate <= currentTime) {
    return;
  }

  
  dateInput.disabled = true;
  startButton.disabled = true;

  timerInterval = setInterval(() => {
    const now = new Date();
    const timeRemaining = targetDate - now;

    if (timeRemaining <= 0) {
      clearInterval(timerInterval);
      dateInput.disabled = false;
      iziToast.success({
        title: 'Success',
        message: "Time's up!",
      });
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(timeRemaining);

   
    daysDisplay.textContent = addLeadingZero(days);
    hoursDisplay.textContent = addLeadingZero(hours);
    minutesDisplay.textContent = addLeadingZero(minutes);
    secondsDisplay.textContent = addLeadingZero(seconds);
  }, 1000);
});
