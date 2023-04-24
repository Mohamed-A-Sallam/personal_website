/*
let num = 123456789;
const f = new Intl.NumberFormat("ar-eg", {
  currency: "EGP",
  style: "currency",
  notation: "compact"
});

console.log(f.format(num));

function success(nav) {
  console.log(nav);
}
function error() {
  console.log("error")
}

document.querySelector(".add").onclick = function () {
  navigator.geolocation.getCurrentPosition(success, error);
}

let ind = 0;
document.querySelector(".add").onclick = function () {
  this.classList.add(`wrong-${++ind}`);
  console.log(document.body)
}
*/
let volume = document.querySelectorAll("audio")[2];
let promp;
document.querySelector(".start > span").onclick = function () {
  promp = prompt("Your name");
  document.querySelector(".promp-val > span").innerHTML = promp || "Unknown";
  this.parentElement.remove()
  volume.volume = 0.05;
  volume.play();
  setTimer();
};
let timer = document.querySelector(".timer");

let box = document.querySelector(".box");
let children = [...box.children];

let indexes = Array.from(Array(children.length).keys());

let minutes = 1;
let seconds = 60;

function setTimer() {
  let clear = setInterval(() => {
    if (minutes === 0 && seconds === 1) {
      timer.innerHTML = "00:00";
      timeOver();
      saveInfo()
      clearInterval(clear);
    } else {
      seconds--
      if (seconds === 0) {
        minutes--;
        seconds = 60;
        if (minutes === 0) {
          minutes = minutes
        }
      }
      timer.innerHTML = `${minutes.toString().length === 1 ? "0" + minutes : minutes}:${seconds.toString().length === 1 ? "0" + seconds : seconds}`;
    }
  }, 1000);
  
}

function timeOver() {
  let timeOver = document.querySelector(".popup");
      timeOver.style.transform = "translate(-50%, -50%) scale(1)";
      box.classList.add("stop-flipping");
      volume.pause();
      Array.from(box.children, (child) => {
        child.classList.remove("is-mached", "is-flipped");
      });
      randomOrder(indexes);
      makeItRandom();
}

randomOrder(indexes);

function randomOrder(arr) {
  
  let decrease = arr.length,
      current,
      random;
  
  while (decrease > 0) {
    
    random = Math.floor(Math.random() * decrease);
    
    
    decrease--
    
    current = arr[decrease];
    arr[decrease] = arr[random];
    arr[random] = current;
  }
  return arr;
};

function makeItRandom() {
  children.forEach((child, ind) => {
    child.style.order = indexes[ind];
  })
}
makeItRandom();

children.forEach(child => {
  child.addEventListener("click", (e) => {
    child.classList.add("is-flipped");
    
    let filter = children.filter(child => child.classList.contains("is-flipped"));
    
    if (filter.length === 2) {
      stopFlipping()
      ifMached(filter[0], filter[1]);
    }
  })
})

function stopFlipping() {
  box.classList.add("stop-flipping");
  setTimeout(() => {
    box.classList.remove("stop-flipping");
  }, 1100);
}

function ifMached(eleOne, eleTwo, child) {
  
  if (eleOne.dataset.anime === eleTwo.dataset.anime) {
    
    eleOne.classList.remove("is-flipped");
    eleTwo.classList.remove("is-flipped");
    
    eleOne.classList.add("is-mached");
    eleTwo.classList.add("is-mached");
    
    document.querySelector("audio").play();
    
  } else {
    
    let count = document.querySelector(".mistakes > span");
    count.innerHTML = +count.innerHTML + 1;
    setTimeout(() => {
      eleOne.classList.remove("is-flipped");
      eleTwo.classList.remove("is-flipped");
    }, 1000);
    
    document.querySelectorAll("audio")[1].play();
    
  }
}

let localInfo = [];

function saveInfo() {
  let toArray = inLocal();
  let userName = document.querySelector(".promp-val > span").textContent;
  let mistakesNum = document.querySelector(".mistakes > span").textContent;
  const usersInfo = {
    id: Date.now(),
    name: userName,
    wrong: mistakesNum,
  };
  if (localStorage.getItem("users")) {
    toArray.push(usersInfo);
    let json = JSON.stringify(toArray);
    localStorage.setItem("users", json);
  } else {
    localInfo.push(usersInfo);
    let json = JSON.stringify(localInfo);
    localStorage.setItem("users", json);
  }
};

function inLocal() {
  if (localStorage.getItem("users")) {
    let toArray = JSON.parse(localStorage.getItem("users"));
    return toArray;
  }
}

function addToPage() {
  if (localStorage.getItem("users")) {
    let users = JSON.parse(localStorage.getItem("users"));
    for (let i = 0; i < users.length; i++) {
      let par = document.createElement("p");
      par.appendChild(document.createTextNode(`Hello ${users[i].name}. Your mistakes are (${users[i].wrong})`));
      document.querySelector(".users").appendChild(par);
    }
  }
}
addToPage()

