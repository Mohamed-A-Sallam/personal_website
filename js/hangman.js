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

let generateLetters = Array.from("abcdefghijklmnopqrstuvwxyz");

let lettersDiv = document.querySelector(".letters");

function appendLetters() {
  generateLetters.forEach((letter, ind) => {
    let span = document.createElement("span");
    let text = document.createTextNode(letter);
    span.setAttribute("ind-val", ind + 1);
    span.appendChild(text);
    lettersDiv.appendChild(span);
  })
}
appendLetters();

let info = {
  anime: ["Tokyo Ghoul", "One Piece", "Violet Evergarden", "Naruto"],
  movies: ["Violent Night", "Silent Voice", "Matrix", "Up", "Luck", "Inside Out"],
  character: ["Luffy", "Zorro", "Edward", "Nami", "Choper"],
};

let objKeys = Object.keys(info),

    randomKeysIndex = Math.floor(Math.random() * objKeys.length),
    
    randomKeys = objKeys[randomKeysIndex],
    
    keysValue = info[randomKeys],
    
    valueIndex = Math.floor(Math.random() * keysValue.length),
    
    valueVal = keysValue[valueIndex];
    console.log(valueVal);


function category() {
  let category = document.querySelector(".category span");
  category.appendChild(document.createTextNode(randomKeys));
};
category();

function createResult() {
  valueVal.split("").forEach((val) => {
    let valueSpan = document.createElement("span");
    if (val === " ") {
      valueSpan.classList.add("space-val")
    }
    document.querySelector(".spaces").appendChild(valueSpan);
  })
}
createResult()

let result = document.querySelectorAll(".spaces span");
let count = 0;
let complete = 0;
function addClick() {
  document.addEventListener("click", (e) => {
    let status = false;
    if (e.target.hasAttribute("ind-val")) {
      
      let tar = e.target.innerHTML,
          value = valueVal.split("");
          
      e.target.classList.add("clicked");
      
      value.forEach((val, ind) => {
        if (tar == val.toLowerCase()) {
          status = true;
          result.forEach((res, index) => {
            if (ind === index) {
              res.innerHTML = tar;
            }
          })
          complete++
        }
      })
      if (status !== true) {
        ++count
        lettersDiv.classList.add(`wrong-${count}`);
        ifWrong(lettersDiv.classList.length);
        if (count === 6) {
          let text = "Game Over, The word is";
          gameOver(text, count, valueVal)
        }
      };
      console.log(count)
      let success = valueVal.split("").filter(ele => {
        return ele !== " ";
      });
      if (complete === success.length) {
        document.querySelectorAll(".letters span").forEach(sp => {
        sp.style.pointerEvents = "none"
      })
      let text = "Congratulations!";
      gameOver(text, count)
      }
    }
  })
}
addClick()

function ifWrong(length) {
  switch (length) {
    case 2:
      document.querySelector(".stand").style.display = "block";
      break;
    case 3:
      document.querySelector(".stick").style.display = "block";
      break;
    case 4:
      document.querySelector(".line").style.display = "block";
      break;
    case 5:
      document.querySelector(".body").style.display = "block";
      break;
    case 6:
      document.querySelector(".hands").style.display = "block";
      break;
    case 7:
      document.querySelector(".legs").style.display = "block";
      document.querySelectorAll(".letters span").forEach(sp => {
        sp.style.pointerEvents = "none"
      })
      break;
  }
}

function gameOver(text, count, val) {
  let div = document.querySelector(".finish");
  let span = document.querySelector(".finish span");
  span.innerHTML = val || `(${count} Mistakes)`;
  div.prepend(document.createTextNode(text));
  div.style.transform = "translateX(-50%) scale(1)"
}
