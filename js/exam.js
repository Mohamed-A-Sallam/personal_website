let currentQuestion = document.querySelector("header > span:first-child span");
let questionsTotal = document.querySelector("header > span:last-child span");
let h2 = document.querySelector(".body h2");
let answers = document.querySelector(".body .answers");
let submit = document.querySelector("button");
let bullets = document.querySelector(".bullets");
let body = document.querySelector(".body");
let counter = document.querySelector(".counter");

let questionsLength;
let index = 0;
let right = 0;
let setInt;

fetch("../json/examQuestions.json").then(
    json => json.json()
  ).then(
    data => {
      
      questionsLength = data.length;
      
      
      lengthAndBullets()
      
      addData(data[index], questionsLength)
      
      setCounter(3)
      
      submit.onclick = function () {
        
        checkAnswers(data[index]);
        index++
        currentQuestion.innerHTML = +currentQuestion.innerHTML + 1
        h2.innerHTML = "";
        answers.innerHTML = "";
        addData(data[index], questionsLength);
        if (index === questionsLength) {
          answers.remove();
          h2.remove();
          submit.remove()
          body.classList.add("center")
          currentQuestion.innerHTML = questionsLength;
          this.className = "stop";
          if (right > (questionsLength / 2) && right < questionsLength) {
            body.innerHTML = `<span class="very-good">Very Good</span>: You scored ${right} of ${questionsLength}`;
          } else if (right === questionsLength) {
            body.innerHTML = `<span class="perfect">Perfect</span>: You scored ${right} of ${questionsLength}`;
          } else {
            body.innerHTML = `<span class="bad">bad</span>: You scored ${right} of ${questionsLength}`;
          }
        }
        
        handleBullets()
        
        clearInterval(setInt)
        setCounter(3)
        
      }
      
    }
  )
  
function lengthAndBullets() {
  currentQuestion.appendChild(document.createTextNode(1))
  questionsTotal.appendChild(document.createTextNode(`(${questionsLength})`));
  for (let i = 0; i < questionsLength; i++) {
    let oneBullet = document.createElement("span");
    bullets.appendChild(oneBullet);
    if (i === 0) {
      oneBullet.className = "active"
    }
    
  }
}

function addData(currentIndex, questionsLength) {
  if (index < questionsLength) {
    h2.appendChild(document.createTextNode(currentIndex.question));
  
    for (let i = 1; i <= 4; i++) {
    let div = document.createElement("div");
    let radio = document.createElement("input");
    radio.type = "radio"
    radio.id = `answer_${i}`;
    radio.name = "radio";
    radio.dataset.info = currentIndex[`answer_${i}`];
    let label = document.createElement("label");
    label.htmlFor = `answer_${i}`;
    label.appendChild(document.createTextNode(currentIndex[`answer_${i}`]));
    
    div.appendChild(radio);
    div.appendChild(label);
    
    answers.appendChild(div);
    
    if (i === 1) {
      radio.checked = true;
    }
  }
  }
}

function checkAnswers(data) {
  let inputs = document.querySelectorAll(".body .answers input");
  inputs.forEach(input => {
    if (input.checked) {
      let val = input.dataset.info;
      if (val === data.correct) {
        right++;
      }
    }
  })
}

function handleBullets() {
  let bullet = document.querySelectorAll(".bullets span");
  Array.from(bullet).forEach((bull, ind) => {
    if (index === ind) {
      Array.from(bullet).forEach(one => {
        one.classList.remove("active");
      })
      bull.classList.add("active")
    }
  })
}

function setCounter(time) {
  
  if (index < questionsLength) {
    setInt = setInterval(() => {
    
   let minutes = Math.floor(time / 60)
   let seconds = time % 60;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;
    
    if (time === 0) {
      clearInterval(setInt);
      submit.click()
    }
    
    counter.innerHTML = `${minutes}:${seconds}`;
    
    time--
    
    
  }, 1000)
  }
  
}
