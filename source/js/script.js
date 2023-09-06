const headerNav = document.querySelector('.header__nav');

const headerNavToggle = document.querySelector('.header-nav__toggle');

const sliderButton = document.querySelector('.slider__button');
const slider = document.querySelector('.slider');

headerNav.addEventListener('click', function () {
if (headerNav.classList.contains('header-nav--closed')) {
  headerNav.classList.remove('header-nav--closed');
  headerNav.classList.add('header-nav--opened');
  }
  else {
  headerNav.classList.add('header-nav--closed');
  headerNav.classList.remove('header-nav--opened');
  }
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
