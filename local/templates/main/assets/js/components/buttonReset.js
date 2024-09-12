const buttonReset = () => {
    const btnReset = document.querySelector('.model__btn-reset');

    btnReset.addEventListener('click', ()=> {
        location.reload();
    });
}

export default buttonReset;