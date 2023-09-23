const sliderButton = document.querySelector('.slider__button');
const slider = document.querySelector('.slider');

/*headerNav.addEventListener('click', function () {
if (headerNav.classList.contains('header-nav--closed')) {
  headerNav.classList.remove('header-nav--closed');
  headerNav.classList.add('header-nav--opened');
  }
  else {
  headerNav.classList.add('header-nav--closed');
  headerNav.classList.remove('header-nav--opened');
  }
});*/
const nav = document.querySelector('.header-nav');
nav.classList.add('header-nav--closed');
const menuButton = document.querySelector('.toggle');
menuButton.addEventListener('click',() => {
nav.classList.toggle('header-nav--closed');
nav.classList.toggle('header-nav--opened');
});

if(sliderButton){
  sliderButton.addEventListener('click', () => {
    const stateBefore = document.querySelector('.slider--state-before');
    const stateAfter = document.querySelector('.slider--state-after');
    if (stateBefore || stateAfter) {
      slider.classList.toggle('slider--state-before');
      slider.classList.toggle('slider--state-after');
    } else {
      slider.classList.add('slider--state-after');
    }
  });
}
