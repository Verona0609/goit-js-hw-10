// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";


const startBtn = document.querySelector("[data-start]");

const datatimePicker = document.getElementById(`datetime-picker`)

let userSelectedDate = null;


/* ТАЙМЕР */
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose: function (selectedDates) {
    const selectedDate = selectedDates[0];
    const now = new Date();
    console.log(selectedDates[0]);

   if(selectedDate <= now){
    alert (`Please choose a date in the future`);
    /* не активна кнопка (disabled-вимкнено) */
    startBtn.disabled = true;
   }else{
    userSelectedDate = selectedDate;
    startBtn.disabled = false;
   }
  },
};




/* FLATPICKR */
 flatpickr(`#datetime-picker`, options);

/* Створення нових зміних для дата атрибута */
const daysSpan = document.querySelector("[data-days]");
const hoursSpan = document.querySelector("[data-hours]");
const minutesSpan = document.querySelector("[data-minutes]");
const secondsSpan = document.querySelector("[data-seconds]");



/* ПОДІЯ НАТИСКАННЯ НА START  */
 startBtn.addEventListener("click", function(){
  if(!userSelectedDate) return;

  startBtn.disabled = true;
  datatimePicker.disabled = true;

const intervalCountdown = setInterval(function(){
const now = new Date();
const restTime = userSelectedDate - now;


  if(restTime <= 0){
    clearInterval(intervalCountdown);
    daysSpan.textContent = `00`;
    hoursSpan.textContent = `00`;
    minutesSpan.textContent = `00`;
    secondsSpan.textContent = `00`;
    alert(`Time is up!`)
    datatimePicker.disabled = false;
    return;

  }else{
    const {days, hours, minutes, seconds} = convertMs(restTime);
    daysSpan.textContent = addLeadingZero(days);
    hoursSpan.textContent = addLeadingZero(hours);
    minutesSpan.textContent = addLeadingZero(minutes);
    secondsSpan.textContent = addLeadingZero(seconds);




   } 1000});

   document.getElementById("datetime-picker").disabled = true;
   startBtn.disabled = true;

  });

/* ФУНКЦІЯ КОНВЕРТАЦІЇ  МІЛІСЕКУНД */

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

/*  ФУНКЦІЯ ДОДАВАННЯ НУЛЯ ДО ЧИСЛА   */
function addLeadingZero(value){
  return String(value).padStart(2, `0`)
}