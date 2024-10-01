const dropdown = ()=> {
    const dropdownButtons = document.querySelectorAll('.model__dropdown-btn');
    const parentElement = document.querySelector('.model__dropdown');
    const dropdownElements = document.querySelectorAll('.model__dropdown-el');
    const modalBody = document.querySelectorAll('.modal-result__body');
    const imgs = document.querySelectorAll('.model__picture-img');
    const blockText = document.querySelectorAll('.model__texts');

    const handleClick = (btn)=> {
        const dataID = btn.getAttribute('data-button-id');

        dropdownButtons.forEach(btn=>{
            btn.classList.remove('is-active');
        });

        btn.classList.add('is-active');

        // img.src = btn.getAttribute('data-url-img')
        
        imgs.forEach(img=> {
            const imgId = img.getAttribute('data-id-img');

            if(imgId === dataID) {
                img.classList.add('is-active');
            }else {
                img.classList.remove('is-active');
            }
        });

        if(parentElement.classList.contains('is-active-first')) {
            parentElement.classList.remove('is-active-first');
            parentElement.classList.add('is-active-second');
        } 
        else if (parentElement.classList.contains('is-active-second')) {
            parentElement.classList.add('is-active-first');
            parentElement.classList.remove('is-active-second');
        }

        dropdownElements.forEach(el=> {
            el.classList.remove('is-active');

            if(el.id === btn.getAttribute('data-id-body')) {
                el.classList.add('is-active');
            }
        });

        modalBody.forEach(el=> {
            el.classList.remove('is-open');

            if(el.getAttribute('data-id') === btn.getAttribute('data-id-body')) {
                el.classList.add('is-open');
            }
        });
        blockText.forEach(block=>{
            const blockID = block.getAttribute('data-id-text');

            if(blockID === dataID) {
                block.classList.add('is-active');
            } 
            else {
                block.classList.remove('is-active');
            }
        });
    }

    dropdownButtons.forEach(btn=> {
        btn.addEventListener('click', ()=> handleClick(btn));
    });
}

export default dropdown;