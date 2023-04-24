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
*/

let slide = document.querySelector(".slider > span");
let images = document.querySelectorAll(".slider img");
let next = document.getElementById("next");
let prev = document.getElementById("prev");
let ulNums = document.querySelector(".numbers");
let length = images.length;
let currentIndex = 0;

function mainFun() {
  images[currentIndex].classList.add("active");
  slide.append(document.createTextNode(`Slide #${currentIndex + 1} of ${length}`));
  
  handleBullets();
  
  bulletsOnClick()
  
  nextOnClick();
  
  prevOnClick();
}
mainFun();


function handleBullets() {
  for (let i = 1; i <= length; i++) {
    let li = document.createElement("li");
    li.innerHTML = `${i}`;
    ulNums.appendChild(li);
    if (i === 1) {
      li.classList.add("active")
    }
  }
};

function slidesAndBullets() {
    let lis = document.querySelectorAll(".numbers li");
    lis.forEach((li, ind) => {
      if (currentIndex === ind) {
        lis.forEach(non => {
          non.classList.remove("active")
        });
        li.classList.add("active");
      }
    })
};

function bulletsOnClick() {
  document.querySelectorAll(".numbers li").forEach((li, ind) => {
    li.addEventListener("click", (e) => {
      document.querySelectorAll(".numbers li").forEach((li) => {
        li.classList.remove("active");
      });
      currentIndex = ind;
      e.target.classList.add("active");
      remove()
      images[currentIndex].classList.add("active");
    })
  })
};

function nextOnClick() {
  next.onclick = function () {
    currentIndex++;
    remove()
    slidesAndBullets()
  }
};

function prevOnClick() {
    prev.onclick = function () {
      currentIndex--;
      remove()
      slidesAndBullets()
    }
    if (currentIndex === 0) {
      prev.classList.add("stop");
    }
};

function remove() {
  images.forEach(img => {
      img.classList.remove("active");
  });
  images[currentIndex].classList.add("active");
  prev.classList.remove("stop");
  next.classList.remove("stop");
  if (currentIndex === length - 1) {
    next.classList.add("stop");
  }
  if (currentIndex === 0) {
    prev.classList.add("stop");
  }
  slide.innerHTML = `Slide #<span>${currentIndex + 1}</span> of ${length}`;
}