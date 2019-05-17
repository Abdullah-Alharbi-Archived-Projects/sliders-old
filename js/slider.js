// this will select section#slider
const slider = document.getElementById('slider');
// this will select ul.slide-track
const slideTrack = document.querySelector('ul.slide-track');

// this will get this attribute 'data-seconds' from section#slider
// if not exists then set this to 15 seconds
const seconds = slider.hasAttribute('data-seconds') ? slider.getAttribute('data-seconds') : 15;

// this will get all the sliders(li.slide) from ul.slide-track
const slides = Array.from(slideTrack.children);

// detect weather slide
const weatherSlide = slideTrack.querySelector('.weather');

// get the slide width
const { width } = slides[0].getBoundingClientRect();

// arrange the slides next to one another
const setSlidePosition = (element, index) => element.style.left = `${width * index}px`;

slides.forEach(setSlidePosition);


const moveToSlide = (track, currentSlide, targetSlide) => {
  slideTrack.style.transform = `translateX(-${targetSlide.style.left})`;
  currentSlide.classList.remove('current-slide');
  targetSlide.classList.add('current-slide');
};

let firstSlide = null;
let lastSlide = null; 

// this will fire after x seconds
setInterval(() => {
  const currentSlide = slideTrack.querySelector('.current-slide');

  if (!firstSlide) {
    currentSlide.id = 'first';
    firstSlide = currentSlide.id;
  }

  const nextSlide = currentSlide.nextElementSibling;
  if (nextSlide === weatherSlide && weatherSlide.hasAttribute('data-weather') && !lastSlide) {
    // next slide is the weather slide
    if (weatherSlide.getAttribute('data-weather') === 'true') {
      if (navigator.onLine) {
        // there's connection!
        // update weather stats after x seconds
        setTimeout(function () {
          weather(weatherSlide.getAttribute('data-city'), weatherSlide.getAttribute('data-temperature-type'), weatherSlide.getAttribute('api-key'));
        }, 1000 * seconds);
      } else {
        // back previous
        currentSlide.id = 'last';
        lastSlide = currentSlide.id;
      }
    } else {
      // back previous
      currentSlide.id = 'last';
      lastSlide = currentSlide.id;
    }
  }
  if (nextSlide && !lastSlide) {
    // move to the next slide
    moveToSlide(slideTrack, currentSlide, nextSlide);
  } else {
    // back to the previous slide
    if (!lastSlide) {
      currentSlide.id = 'last';
      lastSlide = currentSlide.id;
    }

    const previousSlide = currentSlide.previousElementSibling;
    if (previousSlide) {
      moveToSlide(slideTrack, currentSlide, previousSlide);
    } else {
      lastSlide = null;
    }
  }
}, 1000 * seconds);



// initialize weather slide if the clien can access internet
if (navigator.onLine) {
  window.onload = function () {
    weather(weatherSlide.getAttribute('data-city'), weatherSlide.getAttribute('data-temperature-type'), weatherSlide.getAttribute('api-key'));
  }
}
