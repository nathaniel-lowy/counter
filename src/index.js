import "./styles.css";

let falls = [];

document.querySelector("#add-btn").addEventListener("click", addFall);

function addFall() {
  falls.push(new Date());
  displayFalls();
}

function displayFalls() {
  const fallLog = document.querySelector(".logs");
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

  // NOTE: Day/Week/Month/Year calculations will need to be implemented
  year.textContent = parseInt(year.textContent) + 1;
}
