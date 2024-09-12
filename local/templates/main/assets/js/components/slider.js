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
}

export default slider;