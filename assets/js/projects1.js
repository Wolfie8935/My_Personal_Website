// Params
let mainSliderSelector = '.main-slider',
    navSliderSelector = '.nav-slider',
    interleaveOffset = 0;

// Main Slider
let mainSliderOptions = {
    loop: true,
    speed: 1000, // Adjust speed for smoother transitions
    effect: 'cards',
    effect: 'flip',
    flipEffect: {
        slideShadows: true, // Enable slide shadows
        limitRotation: true // Limit flip rotation to prevent over-rotation
    },
    autoplay: {
        delay: 7000, // 5 seconds delay between slides
        disableOnInteraction: false // Autoplay will continue after interactions
    },
    loopAdditionalSlides: 10,
    watchSlidesProgress: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    on: {
        imagesReady: function () {
            this.el.classList.remove('loading');
        },
        slideChangeTransitionEnd: function () {
            const swiper = this;
            const activeSlide = swiper.slides[swiper.activeIndex];
            swiper.slides.forEach(slide => {
                const caption = slide.querySelector('.caption');
                caption && caption.classList.remove('show');
            });
            const activeCaption = activeSlide.querySelector('.caption');
            activeCaption && activeCaption.classList.add('show');
        },
        progress: function () {
            const swiper = this;
            const width = swiper.width;
            const innerOffset = width * interleaveOffset;

            swiper.slides.forEach(slide => {
                const slideProgress = slide.progress;
                const innerTranslate = slideProgress * innerOffset;
                const bgImg = slide.querySelector(".slide-bgimg");
                if (bgImg) {
                    bgImg.style.transform = `translateX(${innerTranslate}px)`;
                }
            });
        },
        touchStart: function () {
            const swiper = this;
            swiper.slides.forEach(slide => {
                slide.style.transition = "";
            });
        },
        setTransition: function (speed) {
            const swiper = this;
            swiper.slides.forEach(slide => {
                slide.style.transition = `${speed}ms`;
                const bgImg = slide.querySelector(".slide-bgimg");
                if (bgImg) {
                    bgImg.style.transition = `${speed}ms`;
                }
            });
        }
    }
};
let mainSlider = new Swiper(mainSliderSelector, mainSliderOptions);








// // Navigation Slider
// let navSliderOptions = {
//     loop: true,
//     loopAdditionalSlides: 10,
//     speed: 600, // Keep speed smooth for navigation slider
//     spaceBetween: 5,
//     slidesPerView: 5,
//     centeredSlides: true,
//     touchRatio: 0.7,
//     slideToClickedSlide: true,
//     direction: 'vertical',
//     on: {
//         imagesReady: function () {
//             this.el.classList.remove('loading');
//         }
//     }
// };
// let navSlider = new Swiper(navSliderSelector, navSliderOptions);

// Matching sliders
mainSlider.controller.control = navSlider;
navSlider.controller.control = mainSlider;
