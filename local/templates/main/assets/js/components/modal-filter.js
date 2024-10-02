const modelFilter = () => {
    const buttons = document.querySelectorAll('.model__filter-btn');
    const texts = document.querySelectorAll('.model__texts');

    const handleButtons = (btn) => {
        buttons.forEach(button=> {
            button.classList.remove('is-active');
        });
        
        btn.classList.add('is-active');

        const dataID = btn.getAttribute('data-id-text');

        
        texts.forEach(text=>{
            const dataIDText = text.getAttribute('data-text-id');

            if(dataIDText === dataID) {
                text.classList.add('is-active');
            } 
            else {
                text.classList.remove('is-active');
            }
        });
    }

    buttons.forEach(btn=>{
        btn.addEventListener('click', ()=> handleButtons(btn));
    });

}

export default modelFilter;