const execution = () => {
    // 2 кнопки для добавления выбора направления
    const buttonsAll = document.querySelectorAll('.block-rotate__btn');
    const btnStateOne = document.getElementById('blockRotateBtnOne');
    const btnStateTwo = document.getElementById('blockRotateBtnTwo');
    // input's внутри кнопок
    const firstInput =  btnStateOne.querySelector('input');
    const secondInput =  btnStateTwo.querySelector('input');
    // кнопка добавления состояния
    const buttonsActiveState = document.querySelectorAll('.block-rotate__btn-state-one');
    // кнопка удаления состояния
    const buttonsDeleteState = document.querySelectorAll('.block-rotate__btn-delete');
    // картинки для разварота
    const imgLeft = document.getElementById('blockRotateImageLeft');
    const imgRight = document.getElementById('blockRotateImageRight');
    const parentImage = document.querySelector('.block-rotate__images');
    // Иконки открытия подсказки
    const btnInfoOpen = document.querySelectorAll('.block-rotate__btn-info');
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

        if(stateOne > 190 || stateTwo < -10) {
            parentImage.classList.add('pt');
            buttonsAll.forEach(btn=> {
                btn.classList.add('top');
            });
        }
        else {
            parentImage.classList.remove('pt');
            buttonsAll.forEach(btn=> {
                btn.classList.remove('top');
            });
        }

        if(stateOne < 170 || stateTwo > 10) {
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
                let rotateImgDeg = Number(parent.getAttribute('data-count-rotate'));

                currentCount += 1;
                rotateImgDeg += 1;

                if(rotateImgDeg <= 90) {
                    parent.setAttribute('data-count-rotate', rotateImgDeg);
                    imgLeft.style.transform = `rotate(${rotateImgDeg}deg)`
                }

                if(currentCount >= 271) return;

                count.value = `${currentCount}`;
                parent.setAttribute('data-count', currentCount);
                // imgLeft.style.transform = `rotate(${currentCount}deg)`;
            }
            if(parent.id === "blockRotateBtnTwo") {
                let currentCount = Number(parent.getAttribute('data-count'));
                console.log('two')
                currentCount += 1;
                if(currentCount >= 91) return;
                count.value = `${currentCount}`;
                parent.setAttribute('data-count', currentCount);
                imgRight.style.transform = `rotate(${currentCount}deg)`;
            }
        }
        //  в меньшую сторону
        if(btn.getAttribute('data-el') === "-") {
            if(parent.id === "blockRotateBtnOne") {
                let currentCount = Number(parent.getAttribute('data-count'));
                let rotateImgDeg = Number(parent.getAttribute('data-count-rotate'));

                currentCount -= 1;
                rotateImgDeg -= 1;

                if (rotateImgDeg >= -90) {
                    rotateImgDeg
                    parent.setAttribute('data-count-rotate', rotateImgDeg);
                    imgLeft.style.transform = `rotate(${rotateImgDeg}deg)`;
                }
                
                if(currentCount <= 89) return;
                count.value = `${currentCount}`;
                parent.setAttribute('data-count', currentCount);
                // imgLeft.style.transform = `rotate(${currentCount}deg)`;
            }

            if(parent.id === "blockRotateBtnTwo") {
                let currentCount = Number(parent.getAttribute('data-count'));

                currentCount -= 1;
                if(currentCount <= -91) return;
                count.value = `${currentCount}`;
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
        const countNode = btn.querySelector('.block-rotate__btn-count input');

        handleRotateImage(parent, btnMinusNode, btnPlusNode, countNode);
    });

    // Изменение через input
    const changeValueInput = (num, parent) => {
        // работа с левыми эллементами
        if(parent === btnStateOne) {
            
            if(num < 90) {
                firstInput.value = 90;
                btnStateOne.setAttribute('data-count-rotate', (90 * -1));
                btnStateOne.setAttribute('data-count', 90);
                imgLeft.style.transform = `rotate(${-90}deg)`;
            }
            if(num >= 270) {
                firstInput.value = 270;
                btnStateOne.setAttribute('data-count-rotate', 90);
                btnStateOne.setAttribute('data-count', 270);
                imgLeft.style.transform = `rotate(${90}deg)`;
            }
            if(num > 180 && num < 270) {
                const res = num - 180;

                btnStateOne.setAttribute('data-count', num);
                imgLeft.style.transform = `rotate(${(res)}deg)`;
                btnStateOne.setAttribute('data-count-rotate', res);

            }
            if(num < 180 && num >= 90 ) {
                const res = 180 - num;
                console.log(true, 124);
                btnStateOne.setAttribute('data-count-rotate', (res * -1));
                imgLeft.style.transform = `rotate(${(res * -1)}deg)`;
                btnStateOne.setAttribute('data-count', num);

            }
            // const parentNum = Number(parent.getAttribute('data-default-count'));
            // console.log(parentNum, num);
            // let count = parentNum - num;

            // if(count > 270) {
            //     count = 90;
            // }

            // if(count < 90) {
            //     count = -90;
            // }

            // firstInput.value = num;
            // btnStateOne.setAttribute('data-count', count);
            // imgLeft.style.transform = `rotate(${count}deg)`;
            checkIndent();
        }
        // работа с правыми эллементами
        if(parent === btnStateTwo) {
            if(num > 90) {
                num = 90;
            }

            if(num < -90) {
                num = -90;
            }

            secondInput.value = num;
            
            btnStateTwo.setAttribute('data-count', num);
            imgRight.style.transform = `rotate(${num}deg)`;
        }

        checkIndent();
    }

    firstInput.addEventListener("change", (e)=> {
        const currentNumber = Number(e.target.value);
        changeValueInput(currentNumber, btnStateOne);
    });

    secondInput.addEventListener("input", (e)=> {
        const currentNumber = Number(e.target.value);
        changeValueInput(currentNumber, btnStateTwo);
    });

    btnInfoOpen.forEach(btn=> {
        const infoBlockText = document.querySelectorAll('.block-rotate__btn-info-text');

        btn.addEventListener("click", (e)=> {
            const dataID = String(btn.getAttribute('data-id-btn'));

            infoBlockText.forEach(text=> {
                const textID = String(text.getAttribute('data-body-id'));
                if(textID === dataID) {
                    text.classList.add('is-active')

                    setTimeout(()=> {
                        text.classList.remove('is-active');
                    },1500);
                }

                else {
                    text.classList.remove('is-active');
                }
            });
        });

    });
}

export default execution;