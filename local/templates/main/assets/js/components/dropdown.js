const dropdown = ()=> {
    const dropdownButtons = document.querySelectorAll('.model__dropdown-btn');
    const parentElement = document.querySelector('.model__dropdown');
    const dropdownElements = document.querySelectorAll('.model__dropdown-el');
    const modalBody = document.querySelectorAll('.modal-result__body');

    const handleClick = (btn)=> {
        dropdownButtons.forEach(btn=>{
            btn.classList.remove('is-active');
        });

        btn.classList.add('is-active');

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
        })
    }

    dropdownButtons.forEach(btn=> {
        btn.addEventListener('click', ()=> handleClick(btn));
    })
}

export default dropdown;