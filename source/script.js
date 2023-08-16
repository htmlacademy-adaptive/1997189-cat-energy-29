const headerNav = document.querySelector('.header__nav');

const headerNavToggle = document.querySelector('.header-nav__toggle');

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
