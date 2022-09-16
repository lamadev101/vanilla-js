const Months = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September",   "October", "November", "December"
]

const Weekdays = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
];

const note = document.querySelector('.note');
const items = document.querySelectorAll('.remaining-time h4');
const deadline = document.querySelector('.deadline');

const tempDate = new Date();
const tempYear = tempDate.getFullYear();
const tempMonth = tempDate.getMonth();
const tempDay = tempDate.getDate();
const tempHour = tempDate.getHours();
const tempMinute = tempDate.getMinutes();
const tempSecond = tempDate.getSeconds();

// const futureDate = new Date(2020, 10, 24, 14, 45, 39);
const futureDate = new Date(tempYear, tempMonth, tempDay + 10, tempHour, tempMinute, tempSecond);

const year = futureDate.getFullYear();
const month = Months[futureDate.getMonth()];
const day = Weekdays[futureDate.getDay()];
const hour = futureDate.getHours();
const minute = futureDate.getMinutes();
const date = futureDate.getDate();

note.textContent = `Giveaway Ends on ${day}, ${date} ${month} ${year} ${hour}:${minute}`

const futureTime = futureDate.getTime();
function getRemaindingTime() {
  const today = new Date().getTime();

  const t = futureTime - today;
  // 1s = 1000ms
  // 1m = 60s
  // 1hr = 60m
  // 1d = 24hr
  // values in miliseconds
  const oneDay = 24 * 60 * 60 * 1000;
  const oneHour = 60 * 60 * 1000;
  const oneMinute = 60 * 1000;

  // calculate all values
  let days = t / oneDay;
  days = Math.floor(days);
  let hours = Math.floor((t % oneDay) / oneHour);
  let minutes = Math.floor((t % oneHour) / oneMinute);
  let seconds = Math.floor((t % oneMinute) / 1000);

  // set values array
  const values = [days, hours, minutes, seconds];

  function format(item) {
    if (item < 10) {
      return (item = `0${item}`);
    }
    return item;
  }

  items.forEach(function (item, index) {
    item.innerHTML = format(values[index]);
  });

  if (t < 0) {
    clearInterval(countdown);
    deadline.innerHTML = `<h4 class="expired">Sorry, This giveaway has expired!</h4>`;
  }
}
// countdown;
let countdown = setInterval(getRemaindingTime, 1000);
//set initial values
getRemaindingTime();