const nav = document.querySelector('.nav');
const toggleButton = document.querySelector('.js-toggle-button');
const sliderList = document.querySelectorAll('.slider__item');
const buttonNext = document.querySelector('.slider-button__button--next');
const buttonPrev = document.querySelector('.slider-button__button--prev');
const sliderPagination = document.querySelector('.slider-pagination');
const paginationPoints = sliderPagination.querySelectorAll('.slider-pagination__button');
const slider = document.querySelector('.range');
const valueMinPrice = document.querySelector('#min-price');
const valueMaxPrice = document.querySelector('#max-price');


nav.classList.add('nav--closed');

toggleButton.addEventListener('click', () => {
  nav.classList.toggle('nav--closed');
  nav.classList.toggle('nav--opened');
});

if (sliderList) {
  const minIndex = 0;
  const maxIndex = sliderList.length - 1;
  let activeIndex = 0;
  const sliderItems = Array.from(sliderList);

  const renderTabIndex = () => {
    sliderItems.forEach((element, index) => {
      element.querySelectorAll('a').forEach((link) => {
        link.tabIndex = (index === activeIndex) ? '0' : '-1';
      });
    });
  };

  const renderPagination = () => {
    document.querySelector('.slider-pagination__button--active')
      .classList.remove('slider-pagination__button--active');
    paginationPoints[activeIndex].classList.add('slider-pagination__button--active');
  };

  const setStatusButton = () => {
    buttonNext.disabled = activeIndex === maxIndex;
    buttonPrev.disabled = activeIndex === minIndex;
  };

  const deactivateSlide = () => sliderList[activeIndex].classList.remove('slider__item--active');

  const activeSlide = () => sliderList[activeIndex].classList.add('slider__item--active');

  setStatusButton();
  const onButtonNextClick = () => {
    deactivateSlide();
    activeIndex++;
    activeSlide();
    setStatusButton();
    renderTabIndex();
    renderPagination();
  };

  const onButtonPrevClick = () => {
    deactivateSlide();
    activeIndex--;
    activeSlide();
    setStatusButton();
    renderTabIndex();
    renderPagination();
  };

  const onPaginationClick = (e) => {
    if (e.target.classList.contains('slider-pagination__button')) {
      deactivateSlide();
      activeIndex = Array.from(paginationPoints).indexOf(e.target);
      activeSlide();
      setStatusButton();
      renderTabIndex();
      renderPagination();
    }
  };

  renderTabIndex();
  renderPagination();
  buttonNext.addEventListener('click', onButtonNextClick);
  buttonPrev.addEventListener('click', onButtonPrevClick);
  sliderPagination.addEventListener('click', onPaginationClick);
}

noUiSlider.create(slider, {
  range: {
    min: 0,
    max: 1000,
  },
  start: [0, 900],
  step: 1,
  connect: [false, true, false],
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(0);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

slider.noUiSlider.on('update', (values, handle) => {
  const value = values[handle];
  if (values[0] === '0') {
    valueMinPrice.style.color = '#bdbdbd';
  } else {
    valueMinPrice.style.color = '#333333';
  }
  if (handle) {
    valueMaxPrice.value = value;
  } else {

    valueMinPrice.value = value;
  }
});

valueMaxPrice.addEventListener('change', () => {
  slider.noUiSlider.set(valueMaxPrice.value);
});

valueMinPrice.addEventListener('change', () => {
  slider.noUiSlider.set(valueMinPrice.value);
});
