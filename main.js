
function resizingSwiper() {
  if (document.body.clientWidth > 992 || screen.width > 992) {
      let swiper = new Swiper(".mySwiper", {
        effect: "coverflow",
        speed: 1000,
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        },
        coverflowEffect: {
          rotate: 0,
          stretch: 0,
          depth: 300,
          modifier: 1,
          slideShadows: false,
        },
        mousewheel: {
          invert: true,
        },
        loop: true,
        slideToClickedSlide: true,
        pagination: {
          el: ".swiper-pagination",
          dynamicBullets: true,
          clickable: true,
        },
      }); 
    } else {
      let swiper = new Swiper(".mySwiper", {
        effect: "coverflow",
        speed: 1000,
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        },
        coverflowEffect: {
          rotate: 0,
          stretch: 50,
          depth: 200,
          modifier: 1,
          slideShadows: false,
        },
        mousewheel: {
          invert: true,
        },
        loop: true,
        slideToClickedSlide: true,
        pagination: {
          el: ".swiper-pagination",
          dynamicBullets: true,
          clickable: true,
        },
      });
    }
}
resizingSwiper()
window.onresize = function () {
  resizingSwiper()
}

let theBackground = document.querySelector(".landing")

let swiperWrapper = document.querySelector(".swiper-wrapper");
let swiperImages = Array.from(document.querySelectorAll(".swiper-wrapper img"));
let swiperSlide = Array.from(document.querySelectorAll(".swiper-wrapper .swiper-slide"));
let bullets = document.querySelector(".bullets");

let form = document.querySelector(".slider form")
let input = document.querySelector(".slider form input")
let submit = document.querySelector(".slider form input[type=submit]")
let theActiveSlideBg;

function swipers() {
  let setIntSwiper = setInterval(() => {
    theActiveSlideBg = document.querySelector(".swiper-slide-active img").dataset.bgSrc;
    theBackground.style.cssText = `background-image:url(${theActiveSlideBg})`;
  }, 50)
  swiperImages.forEach((img) => {
    img.onclick = function () {
      clearInterval(setIntSwiper)
      theBackground.style.cssText = `background-image:url(${this.dataset.bgSrc})`
      dblClickMsg()
    }
  })
  imageLink(setIntSwiper)
}
swipers()

let icon = document.querySelector(".slider i");
let message = document.querySelector(".message");

function dblClickMsg () {
  icon.classList.add("show-icon");
  icon.addEventListener("click", () => {
    message.classList.add("show-message")
  })
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("close")) {
      message.classList.remove("show-message")
      icon.classList.remove("show-icon");
      
    }
  })
}

function changeSwiperToDefault () {
  swiperImages.forEach((img) => {
    img.addEventListener("dblclick", () => {
      swipers()
    })
    let time;
    img.addEventListener("touchstart", () => {
      let date = new Date();
      let currentTime = date.getTime();
      let durationBetweenGaps = 200;
      if (currentTime - time < durationBetweenGaps) {
        swipers()
      }
      time = currentTime;
    })
  })
}
changeSwiperToDefault()


function imageLink (setIntSwiper) {
  submit.onclick = function (e) {
    e.preventDefault()
    if (input.value != "") {
      clearInterval(setIntSwiper)
      theBackground.style.cssText = `background-image:url(${input.value})`;
      input.value = "";
    }
  }
}

window.onscroll = function () {
    let container = Array.from(document.getElementsByClassName("container"));
    container.forEach((con) => {
      let id = con.id
      if (window.scrollY >= con.offsetTop - 600) {
        Array.from(document.querySelectorAll(`.${id} .move-down`)).forEach((move) => {
          move.classList.remove("move-down")
          if (con.classList.contains("line")) {
            document.querySelector(`.${id} .heading`).classList.add("line-through")
          }
      })
      } else {
        Array.from(document.querySelectorAll(`.${id} .default`)).forEach((def) => {
          def.classList.add("move-down")
        })
        if (con.classList.contains("line")) {
            document.querySelector(`.${id} .heading`).classList.remove("line-through")
          }
      }
    })
  }

let date = new Date();
document.querySelector("footer p .current-year").innerHTML = date.getFullYear()