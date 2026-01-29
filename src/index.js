import "./styles.css";

let falls = [];
let counters = [0,0,0,0];

document.querySelector("#add-btn").addEventListener("click", addFall);

function checkResets() {
  const today = new Date();
  console.log(today.getDay()); // 0-6, for example: Wednesday returns 3
  // if (today.getDay)
}

function addFall() {
  falls.push(new Date());
  checkResets();
  counters = counters.map(counter => {
    return counter = counter + 1;
  });
  displayFalls();
}

function displayFalls() {
  const fallLog = document.querySelector(".logs");
  const day = document.querySelector(".day");
  const week = document.querySelector(".week");
  const month = document.querySelector(".month");
  const year = document.querySelector(".year");
  const options = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  }
  fallLog.replaceChildren();
  falls.forEach((fall) => {
    const dateOutput = new Intl.DateTimeFormat("en-us", options).format(fall);
    const fallCount = document.createElement("p");
    fallCount.classList.add("log");
    fallCount.textContent = dateOutput;
    fallLog.prepend(fallCount);
  });

  day.textContent = counters[0];
  week.textContent = counters[1];
  month.textContent = counters[2];
  year.textContent = counters[3];
}
