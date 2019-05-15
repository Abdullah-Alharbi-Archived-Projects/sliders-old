// this will select section#slider
const slider = document.getElementById('slider');
// this will select ul.slide-track
const slideTrack = document.querySelector('ul.slide-track');

// this will get this attribute 'data-seconds' from section#slider
// if not exists then set this to 15 seconds
const seconds = slider.hasAttribute('data-seconds') ? slider.getAttribute('data-seconds') : 15;

// this will get all the sliders(li.slide) from ul.slide-track
const slides = Array.from(slideTrack.children);

// get the slide width
const { width } = slides[0].getBoundingClientRect();

// arrange the slides next to one another
const setSlidePosition = (element, index) => element.style.left = `${width * index}px`;

slides.forEach(setSlidePosition);
