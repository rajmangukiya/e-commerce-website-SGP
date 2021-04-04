const style = getComputedStyle(document.body);
const images = document.querySelectorAll('.image');
const slideRounds = document.querySelectorAll('.slideround');

slideRounds.forEach(slideRound => {
  slideRound.addEventListener('click', handleSlide);
});

let imageNo = 2;
setInterval(() => {
  slideAnimation(imageNo);
  imageNo == 3 ? imageNo = 1 : imageNo++;
 },3000);

function slideAnimation(imageNo) {
  slideRounds.forEach(slideRound => {
    if(slideRound.dataset.image == imageNo)
      slideRound.style.background = 'white';
    else 
      slideRound.style.background = 'none'; 
  });
  images.forEach(image => {
    let slideLength = images[((1 + imageNo) % 3)].width;
    image.style.transform = `translateX(-${(imageNo - 1) * slideLength}px)`;
  });
}

function handleSlide(e) {
  slideRounds.forEach(slideRound => {
    slideRound.style.background = 'none'; 
  });
  this.style.background = 'white';
  imageNo = this.dataset.image;
  images.forEach(image => {
    let slideLength = images[((1 + imageNo) % 3)].width;
    image.style.transform = `translateX(-${(imageNo - 1) * slideLength}px)`;
  })
}

// set width and height of slider
const heightPercentage = style.getPropertyValue('--slider-percentage');
document.documentElement.style.setProperty('--slider-height', `${((window.innerWidth * heightPercentage) / 100)}px`);

const slider = document.querySelector('.slider');