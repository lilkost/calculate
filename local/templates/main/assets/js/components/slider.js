const slider = ()=> {
    const slider = document.querySelector('.result-slider');
    const swiper = new Swiper(slider, {
        direction: 'horizontal',
        loop: false,
        slidesPerView: 5.726,
        spaceBetween: 16,
    });
}

export default slider;