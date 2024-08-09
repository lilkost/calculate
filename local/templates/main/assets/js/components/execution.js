const execution = () => {
    // 2 кнопки для добавления выбора направления
    const buttonsAll = document.querySelectorAll('.block-rotate__btn');
    const btnStateOne = document.getElementById('blockRotateBtnOne');
    const btnStateTwo = document.getElementById('blockRotateBtnTwo');
    // кнопка добавления состояния
    const buttonsActiveState = document.querySelectorAll('.block-rotate__btn-state-one');
    // кнопка удаления состояния
    const buttonsDeleteState = document.querySelectorAll('.block-rotate__btn-delete');
    // картинки для разварота
    const imgLeft = document.getElementById('blockRotateImageLeft');
    const imgRight = document.getElementById('blockRotateImageRight');
    const parentImage = document.querySelector('.block-rotate__images');
    // ссылки на картинки
    const srcImages = {
        defaultLeft: 'local/templates/main/assets/image/rotate/default-left.svg',
        activeLeft: 'local/templates/main/assets/image/rotate/active-left.svg',

        defaultRight: 'local/templates/main/assets/image/rotate/default-right.svg',
        activeRight: 'local/templates/main/assets/image/rotate/active-right.svg'
    }
    // функция активации изображения
    const checlImageStatus = () => {
        // Левая картинка
        if(btnStateOne.classList.contains('is-active')) {
            imgLeft.src = srcImages.activeLeft
        }else {
            imgLeft.src = srcImages.defaultLeft;
        }
        // правая картинка
        if(btnStateTwo.classList.contains('is-active')) {
            imgRight.src = srcImages.activeRight;
        } else {
            imgRight.src = srcImages.defaultRight;
        }
    }
    // проверка на верхний или нижний отступ
    const checkIndent = () => {
        const stateOne = Number(btnStateOne.getAttribute('data-count'));
        const stateTwo = Number(btnStateTwo.getAttribute('data-count'));

        if(stateOne > 10 || stateTwo < -10) {
            parentImage.classList.add('pt');
            buttonsAll.forEach(btn=> {
                btn.classList.add('top');
            })
        }else {
            parentImage.classList.remove('pt');
            buttonsAll.forEach(btn=> {
                btn.classList.remove('top');
            });
        }

        if(stateOne < -10 || stateTwo > 10) {
            parentImage.classList.add('pb')
        }else {
            parentImage.classList.remove('pb')
        }

    }
    // Изменение при клике на кнопку состояния
    const setStateActive = (btn) => {
        const parentElement = btn.closest('.block-rotate__btn');
        parentElement.classList.add('is-active');
        checlImageStatus();
    }
    buttonsActiveState.forEach(btn=> {
        btn.addEventListener('click', ()=> setStateActive(btn))
    });
    // удалить активный класс
    const removeStateActive = (btn) => {
        const parentElement = btn.closest('.block-rotate__btn');
        parentElement.classList.remove('is-active');
        checlImageStatus();
        
        if(parentElement.id === "blockRotateBtnOne") {
            imgLeft.style.transform = 'rotate(0deg)';
            parentElement.setAttribute('data-count', 0);
            parentElement.querySelector('.block-rotate__btn-count').innerHTML = 0;
        }

        if(parentElement.id === "blockRotateBtnTwo") {
            imgRight.style.transform = 'rotate(0deg)';
            parentElement.setAttribute('data-count', 0);
            parentElement.querySelector('.block-rotate__btn-count').innerHTML = 0;
        }

        checkIndent();
    }

    buttonsDeleteState.forEach(btn=> {
        btn.addEventListener('click', ()=> removeStateActive(btn))
    });

    // Функция пересчета
    const changeRotate = (parent, btn, count) => {
        // в большую сторону
        if(btn.getAttribute('data-el') === "+") {
            if(parent.id === "blockRotateBtnOne") {
                let currentCount = Number(parent.getAttribute('data-count'));

                currentCount -= 1;
                if(currentCount <= -91) return;
                count.innerHTML = `${currentCount * -1}`;
                parent.setAttribute('data-count', currentCount);
                imgLeft.style.transform = `rotate(${currentCount}deg)`;
            }
            if(parent.id === "blockRotateBtnTwo") {
                let currentCount = Number(parent.getAttribute('data-count'));
                console.log('two')
                currentCount += 1;
                if(currentCount >=   91) return;
                count.innerHTML = `${currentCount}`;
                parent.setAttribute('data-count', currentCount);
                imgRight.style.transform = `rotate(${currentCount}deg)`;
            }
        }
        //  в меньшую сторону
        if(btn.getAttribute('data-el') === "-") {
            if(parent.id === "blockRotateBtnOne") {
                let currentCount = Number(parent.getAttribute('data-count'));

                currentCount += 1;
                if(currentCount >= 91) return;
                count.innerHTML = `${currentCount * -1}`;
                parent.setAttribute('data-count', currentCount);
                imgLeft.style.transform = `rotate(${currentCount}deg)`;
            }

            if(parent.id === "blockRotateBtnTwo") {
                let currentCount = Number(parent.getAttribute('data-count'));

                currentCount -= 1;
                if(currentCount <= -91) return;
                count.innerHTML = `${currentCount}`;
                parent.setAttribute('data-count', currentCount);
                imgRight.style.transform = `rotate(${currentCount}deg)`;
            }
        }

        checkIndent();
    }

    // изсенение угла поворота картинки
    const handleRotateImage = (parent, btnMin, btnPlus, count) => {
        btnMin.addEventListener('click', ()=> changeRotate(parent, btnMin, count))
        btnPlus.addEventListener('click', ()=> changeRotate(parent, btnPlus, count))
    }

    buttonsAll.forEach(btn=> {
        const parent = btn;
        const btnMinusNode = btn.querySelector('.block-rotate__btn-count-minus');
        const btnPlusNode = btn.querySelector('.block-rotate__btn-count-plus');
        const countNode = btn.querySelector('.block-rotate__btn-count');

        handleRotateImage(parent, btnMinusNode, btnPlusNode, countNode);
    })
}

export default execution;