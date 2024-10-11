const slider = ()=> {
    // const slider = document.querySelector('.result-slider');
    const swiper = new Swiper('.result-slider', {
        direction: 'horizontal',
        loop: false,
        slidesPerView:"auto",
        spaceBetween: 16,
        // breakpoints: {
        //     993: {
        //         slidesPerView: "auto",
        //         spaceBetween: 16,
        //     },

        //     769: {
        //         slidesPerView: "auto",
        //         spaceBetween: 16,
        //     },

        //     480: {
        //         slidesPerView: "auto",
        //         spaceBetween: 16,
        //     }
        // }
    });

    if(document.querySelector('.grille-type__modal-slider')) {
        const slider = document.querySelector('.grille-type__modal-slider');
        const swiper = new Swiper(slider, {
            direction: 'horizontal',
            slidesPerView: 1,
            spaceBetween: 10,
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            // Navigation arrows
            navigation: {
                nextEl: '.grille-type__modal-slider-btn-next',
                prevEl: '.grille-type__modal-slider-btn-prev',
            },
        });
    }
}

export default slider;