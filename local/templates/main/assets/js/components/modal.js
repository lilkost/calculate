const modal = () => {
    const modalOpenBtn = document.querySelector('.result__btn');
    const modal = document.querySelector('.modal-result');
    const modalCloseBtn = document.querySelector('.modal-result__btn-close');

    const toggleOpenModal = () => {
        modal.classList.toggle('is-open');
    }

    modalOpenBtn.addEventListener('click', ()=> toggleOpenModal());
    modalCloseBtn.addEventListener('click', ()=> toggleOpenModal());

    window.addEventListener('keypress', (e)=> {
        if(e.keyCode === 27) {
            modal.classList.remove('is-open');
        }
    })
}

export default modal;