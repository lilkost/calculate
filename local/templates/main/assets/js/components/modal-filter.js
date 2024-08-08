const modelFilter = () => {
    const buttons = document.querySelectorAll('.model__filter-btn');

    const handleButtons = (btn) => {
        buttons.forEach(button=> {
            button.classList.remove('is-active');
        });

        btn.classList.add('is-active');
    }

    buttons.forEach(btn=>{
        btn.addEventListener('click', ()=> handleButtons(btn));
    });

}

export default modelFilter;