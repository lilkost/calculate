const modelFilter = () => {
    const buttons = document.querySelectorAll('.model__filter-btn');
    const texts = document.querySelectorAll('.model__texts');
    const imaegesNode = document.querySelectorAll('.model__picture-img');

    const handleButtons = (btn) => {
        const dataStatePage = String(btn.getAttribute("data-block-active"));
        const dataImageActive = String(btn.getAttribute("data-picture-show"))

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

        // state block's
        if(dataStatePage === 'grille' || dataStatePage === 'all') {
            document.querySelector('.grille-type').classList.remove('is-disabled');
        } else {
            document.querySelector('.grille-type').classList.add('is-disabled');
            document.querySelectorAll('.grille-type__texts').forEach(text=>{
                text.classList.remove('is-active');
            });
            document.querySelectorAll('.grille-type__images').forEach(img=> {
                img.classList.remove('is-active');
            });
            document.querySelectorAll('.grille-type__item').forEach(itm=> {
                const dataID = String(itm.getAttribute('data-id'));

                if(dataID === 'grDisabled') {
                    itm.classList.add('is-active');
                    itm.querySelector('input').checked = true;
                } else {
                    itm.classList.remove('is-active');
                }
            });
        }

        if(dataStatePage === 'colorRAL' || dataStatePage === 'all') {
            document.querySelector('.colorRal').classList.remove('is-disabled') 
        } else {
            document.querySelector('.colorRal').classList.add('is-disabled');
            document.querySelector('.colorRal').classList.remove('is-active');
            document.querySelector('.colorRal .filter-color__item-decor_two-el input').value = '';
            document.querySelector('.colorRal .filter-color__label input').checked = false;
            document.querySelector('.filter-color__texts').innerHTML = '';
        }

        imaegesNode.forEach(img=> {
            const imgDataId = String(img.getAttribute("data-id-img"));

            if(imgDataId === dataImageActive) {
                img.classList.add("is-active")
            } else {
                img.classList.remove("is-active")
            }
        });
    }

    buttons.forEach(btn=>{
        btn.addEventListener('click', ()=> handleButtons(btn));
    });

}

export default modelFilter;