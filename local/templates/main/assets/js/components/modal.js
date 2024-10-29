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
    });

    if(document.querySelector('.grille-type__modal')) {
        const modal = document.querySelector('.grille-type__modal');
        const btnOpen = document.querySelector('.grille-type__btn ');
        const btnClose = document.querySelector('.grille-type__modal-close-btn');

        btnOpen.addEventListener("click", ()=> {
            modal.classList.add('is-open')
            document.querySelector('.frame-type__modal').classList.remove('is-open')
        });

        btnClose.addEventListener("click", ()=> {
            modal.classList.remove('is-open');
        });
        
        window.addEventListener('keypress', (e)=> {
            if(e.keyCode === 27) {
                modal.classList.remove('is-open');
            }
        });
    }

    if(document.querySelector('.frame-type__modal')) {
        const modal = document.querySelector('.frame-type__modal');
        const btnOpen = document.querySelector('.frame-type__btn');
        const btnClose = document.querySelector('.frame-type__modal-close-btn');

        btnOpen.addEventListener("click", ()=> {
            modal.classList.add('is-open')
            document.querySelector('.grille-type__modal').classList.remove('is-open')
        });

        btnClose.addEventListener("click", ()=> {
            modal.classList.remove('is-open');
        });
        
        window.addEventListener('keypress', (e)=> {
            if(e.keyCode === 27) {
                modal.classList.remove('is-open');
            }
        });
    }
}

export default modal;