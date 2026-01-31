import "./styles.css";

let falls = [];
// The below counters should push a new value in each new day/week/month/year,
// and increment the latest position element each update.
// However, a check will need to be incorporated to reset the data each year,
// so that arrays don't load in the new year with new data. Testing the year
// against the latest save should resolve this issue.
let days = [];
let weeks = [];
let months = [];
let years = [];

for (let i = 0; i < 365; i++) {
  days.push(0);
}
for (let i = 0; i < 52; i++) {
  weeks.push(0);
}
for (let i = 0; i < 12; i++) {
  months.push(0);
}
for (let i = 0; i < 200; i++) {
  years.push(0);
}

document.querySelector("#add-btn").addEventListener("click", addFall);

// This script is released to the public domain and may be used, modified and
// distributed without restrictions. Attribution not necessary but appreciated.
// Source: https://weeknumber.com/how-to/javascript

// Returns the ISO week of the date.
Date.prototype.getWeek = function () {
  var date = new Date(this.getTime());
  date.setHours(0, 0, 0, 0);
  // Thursday in current week decides the year.
  date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
  // January 4 is always in week 1.
  var week1 = new Date(date.getFullYear(), 0, 4);
  // Adjust to Thursday in week 1 and count number of weeks from date to week1.
  return (
    1 +
    Math.round(
      ((date.getTime() - week1.getTime()) / 86400000 -
        3 +
        ((week1.getDay() + 6) % 7)) /
        7,
    )
  );
};

function addFall() {
  const today = new Date();
  falls.push(new Date());

  days[today.getDate()] = days[today.getDate()] + 1;
  weeks[today.getWeek()] = weeks[today.getWeek()] + 1;
  months[today.getMonth()] = months[today.getMonth()] + 1;
  years[today.getFullYear() - 2026] = years[today.getFullYear() - 2026] + 1;
  save();
  displayFalls();
}

function displayFalls() {
  const today = new Date();
  const fallLog = document.querySelector(".logs");
  const day = document.querySelector(".day");
  const week = document.querySelector(".week");
  const month = document.querySelector(".month");
  const year = document.querySelector(".year");
  const options = {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  fallLog.replaceChildren();
  falls.forEach((fall) => {
    const dateOutput = new Intl.DateTimeFormat("en-us", options).format(fall);
    const fallCount = document.createElement("p");
    fallCount.classList.add("log");
    fallCount.textContent = dateOutput;
    fallLog.prepend(fallCount);
  });

  day.textContent = days[today.getDate()];
  week.textContent = weeks[today.getWeek()];
  month.textContent = months[today.getMonth()];
  year.textContent = years[today.getFullYear() - 2026];
}

load();
displayFalls();

function save() {
  localStorage.setItem(
    "fall-counter-heading",
    JSON.stringify(document.querySelector("h3").textContent),
  );
  localStorage.setItem("fall-counter-falls", JSON.stringify(falls));
  localStorage.setItem("fall-counter-days", JSON.stringify(days));
  localStorage.setItem("fall-counter-weeks", JSON.stringify(weeks));
  localStorage.setItem("fall-counter-months", JSON.stringify(months));
  localStorage.setItem("fall-counter-years", JSON.stringify(years));
}

function load() {
  console.log("load called");
  if (localStorage.getItem("fall-counter-falls") !== null) {
    const fallStrings = JSON.parse(localStorage.getItem("fall-counter-falls"));
    document.querySelector("h3").textContent = JSON.parse(
      localStorage.getItem("fall-counter-heading"),
    );
    days = JSON.parse(localStorage.getItem("fall-counter-days"));
    weeks = JSON.parse(localStorage.getItem("fall-counter-weeks"));
    months = JSON.parse(localStorage.getItem("fall-counter-months"));
    years = JSON.parse(localStorage.getItem("fall-counter-years"));

    fallStrings.forEach((fall) => {
      falls.push(new Date(fall));
    });
  }
}
