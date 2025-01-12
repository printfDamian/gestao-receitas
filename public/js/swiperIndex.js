document.addEventListener('DOMContentLoaded', function () {
    const swiper = new Swiper(".mySwiper", {
        slidesPerView: 3,
        loop: true,
        centeredSlides: true,
        spaceBetween: 30,

        pagination: {
            el: ".swiper-pagination",
            clickable: true
        },

        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },

        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 20
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 30
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 30
            }
        }
    });
});