const dropdown = ()=> {
    const dropdownButtons = document.querySelectorAll('.model__dropdown-btn');
    const parentElement = document.querySelector('.model__dropdown');
    const dropdownElements = document.querySelectorAll('.model__dropdown-el');
    const modalBody = document.querySelectorAll('.modal-result__body');
    const imgs = document.querySelectorAll('.model__picture-img');

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
        
        // if(parentElement.classList.contains('is-active-first')) {
        //     parentElement.classList.remove('is-active-first');
        //     parentElement.classList.add('is-active-second');
        // } 
        // else if (parentElement.classList.contains('is-active-second')) {
        //     parentElement.classList.add('is-active-first');
        //     parentElement.classList.remove('is-active-second');
        // }

        const dataParentClass = btn.getAttribute('data-parrent-class');

        if(dataParentClass === 'is-active-first') {
            parentElement.classList.add('is-active-first');
            parentElement.classList.remove('is-active-second');
        }
        else {
            parentElement.classList.remove('is-active-first');
            parentElement.classList.add('is-active-second');
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

    }

    dropdownButtons.forEach(btn=> {
        btn.addEventListener('click', ()=> handleClick(btn));
    });

    if(document.querySelector('.model__texts')) {
        const texts = document.querySelectorAll('.model__texts');

        // model__texts-btn

        texts.forEach(el=> {
            const btn = el.querySelector(".model__texts-btn");

            btn.addEventListener("click", ()=> {
                el.classList.remove("is-active");
            });
        });
    }
}

export default dropdown;