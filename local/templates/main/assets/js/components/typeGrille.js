const changeTypeFn = () => {
    const handleClick = (buttons, texts, images) => {
        buttons.forEach(btn=> {
            btn.addEventListener("click", ()=> {
                const currentID = btn.getAttribute('data-id');
    
                if(currentID === 'grDisabled'){
                    texts.forEach(text=> text.classList.remove('is-active'));
                    images.forEach(img=>img.classList.remove('is-active'));
    
                    return
                }
    
                texts.forEach(text=>{
                    const textID = text.getAttribute('data-id-text');
    
                    if(textID === currentID) {
                        text.classList.add('is-active');
                    } 
                    else {
                        text.classList.remove('is-active');
                    }
                });
    
                images.forEach(img=> {
                    const imgID = img.getAttribute('data-id-img');
    
                    if(imgID === currentID) {
                        img.classList.add('is-active');
                    }
                    else {
                        img.classList.remove('is-active');
                    }
                });
            });
        });
    }

    if(document.querySelector('.filter__item.grille-type__item')) {
        const buttons = document.querySelectorAll('.filter__item.grille-type__item');
        const texts = document.querySelectorAll('.grille-type__texts');
        const images = document.querySelectorAll('.grille-type__images');

        handleClick(buttons, texts,images);
    }

    if(document.querySelector('.filter__item.frame-type__item')) {
        const buttons = document.querySelectorAll('.filter__item.frame-type__item');
        const texts = document.querySelectorAll('.frame-type__text');
        const images = document.querySelectorAll('.frame-type__img');

        handleClick(buttons, texts,images);
    }

    if(document.querySelector('.filter-color__item')) {
        const buttons = document.querySelectorAll('.filter-color__item');
        const text = document.querySelector('.filter-color__texts');

        buttons.forEach(btn=> {
            btn.addEventListener("click", ()=> {
                if(!btn.classList.contains('filter-color__item_input')) {
                    const dataCurrentColor = btn.getAttribute('data-color');
                    const dataCurrentNameColor = btn.getAttribute('data-name-color');
    
                    text.innerHTML = `Анодированное покрытие ${dataCurrentNameColor} цвета: ${dataCurrentColor}`
                }
                else {
                    const input = document.querySelector('.filter-color__item-decor.filter-color__item-decor_two-el input');
                    text.innerHTML = `Порошковое покрытие по RAL № ${input.value}`;

                    input.addEventListener("input", (e)=> {
                        text.innerHTML = `Порошковое покрытие по RAL № ${input.value}`;
                    })
                }
            });
        });
    }
}

export default changeTypeFn;