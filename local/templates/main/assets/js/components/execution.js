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

        if(stateOne >= 110 || stateTwo <= -110) {
            parentImage.classList.add('pt');
            buttonsAll.forEach(btn=> {
                btn.classList.add('top');
            });
        }
        else {
            parentImage.classList.remove('pt');
            console.log('efefefefe')
            buttonsAll.forEach(btn=> {
                btn.classList.remove('top');
            });
        }

        if(stateOne <= -110 || stateTwo >= 110) {
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

                if(rotateImgDeg === 0) {
                    currentCount = 90;
                    parent.setAttribute('data-count', currentCount);
                    count.value = `${currentCount}`;
                }

                currentCount += 1;
                rotateImgDeg += 1;

                if(currentCount >= 136) return;

                count.value = `${currentCount}`;
                parent.setAttribute('data-count', currentCount);
                parent.setAttribute('data-count-rotate', rotateImgDeg);
                imgLeft.style.transform = `rotate(${rotateImgDeg}deg)`
            }
            if(parent.id === "blockRotateBtnTwo") {

                let currentCount = Number(parent.getAttribute('data-count'));
                let rotateImgDeg = Number(parent.getAttribute('data-count-rotate'));

                if(rotateImgDeg === 0) {
                    currentCount = 90;
                    parent.setAttribute('data-count', currentCount);
                    count.value = `${currentCount}`;
                }

                currentCount += 1;
                rotateImgDeg += 1;

                if(currentCount >= 136) return;

                count.value = `${currentCount}`;
                parent.setAttribute('data-count', currentCount);
                parent.setAttribute('data-count-rotate', rotateImgDeg);
                imgRight.style.transform = `rotate(${rotateImgDeg}deg)`
            }
        }
        //  в меньшую сторону
        if(btn.getAttribute('data-el') === "-") {
            if(parent.id === "blockRotateBtnOne") {
                let currentCount = Number(parent.getAttribute('data-count'));
                let rotateImgDeg = Number(parent.getAttribute('data-count-rotate'));
                
                if(rotateImgDeg === 0) {
                    currentCount = -90;
                    parent.setAttribute('data-count', currentCount);
                    count.value = `${currentCount}`;
                }

                currentCount -= 1;
                rotateImgDeg -= 1;


                if(currentCount <= -136) return;

                count.value = `${currentCount}`;
                parent.setAttribute('data-count', currentCount);
                parent.setAttribute('data-count-rotate', rotateImgDeg);
                imgLeft.style.transform = `rotate(${rotateImgDeg}deg)`;

                checkIndent();
            }

            if(parent.id === "blockRotateBtnTwo") {

                let currentCount = Number(parent.getAttribute('data-count'));
                let rotateImgDeg = Number(parent.getAttribute('data-count-rotate'));
                
                if(rotateImgDeg === 0) {
                    currentCount = -90;
                    parent.setAttribute('data-count', currentCount);
                    count.value = `${currentCount}`;
                }

                currentCount -= 1;
                rotateImgDeg -= 1;


                if(currentCount <= -136) return;

                count.value = `${currentCount}`;
                parent.setAttribute('data-count', currentCount);
                parent.setAttribute('data-count-rotate', rotateImgDeg);
                imgRight.style.transform = `rotate(${rotateImgDeg}deg)`;

                checkIndent();
            }
        }

        checkIndent();
        changeMaxWidthInput();
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
    // const change second value max width input 
    function changeMaxWidthInput(){
        if(secondInput.value > 10) {
            secondInput.style.maxWidth = '26px';
        }
        else if(secondInput.value < 10 && secondInput.value > 0) {
            secondInput.style.maxWidth = '17px';
        } 
        else if(secondInput.value < 0 && secondInput.value > -10){
            secondInput.style.maxWidth = '17px';
        }
        else if (secondInput.value <= -10) {
            secondInput.style.maxWidth = '26px';
        }
    }
    // Изменение через input
    const changeValueInput = (num, parent) => {
        // работа с левыми эллементами
        if(parent === btnStateOne) {
            if(num > 135) {
                firstInput.value = 135;
                btnStateOne.setAttribute('data-count-rotate', 45);
                btnStateOne.setAttribute('data-count', 135);
                imgLeft.style.transform = `rotate(${45}deg)`;
            }
            else if(num === 90) {
                firstInput.value = 90;
                btnStateOne.setAttribute('data-count-rotate', 0);
                btnStateOne.setAttribute('data-count', 90);
                imgLeft.style.transform = `rotate(${0}deg)`;
            }
            else if (num < 90) {
                firstInput.value = 90;
                btnStateOne.setAttribute('data-count-rotate', 0);
                btnStateOne.setAttribute('data-count', 90);
                imgLeft.style.transform = `rotate(${0}deg)`;
            }
            else {
                if(num > 0) {
                    let res = num - 90;
                    firstInput.value = num;
                    btnStateOne.setAttribute('data-count-rotate', res);
                    btnStateOne.setAttribute('data-count', num);
                    imgLeft.style.transform = `rotate(${res}deg)`;
                }
                else {
                    let res = num - (-90);
                    firstInput.value = num;
                    btnStateOne.setAttribute('data-count-rotate', res);
                    btnStateOne.setAttribute('data-count', num);
                    imgLeft.style.transform = `rotate(${res}deg)`;
                }
            }
            checkIndent();
        }
        // работа с правыми эллементами
        if(parent === btnStateTwo) {
            if(num > 135) {
                secondInput.value = 135;
                btnStateTwo.setAttribute('data-count-rotate', 45);
                btnStateTwo.setAttribute('data-count', 135);
                imgRight.style.transform = `rotate(${45}deg)`;
            }
            else if(num === 90) {
                secondInput.value = 90;
                btnStateTwo.setAttribute('data-count-rotate', 0);
                btnStateTwo.setAttribute('data-count', 90);
                imgRight.style.transform = `rotate(${0}deg)`;
            }
            else if (num < 90) {
                secondInput.value = 90;
                btnStateTwo.setAttribute('data-count-rotate', 0);
                btnStateTwo.setAttribute('data-count', 90);
                imgRight.style.transform = `rotate(${0}deg)`;
            }
            else {
                if(num > 0) {
                    let res = num - 90;
                    secondInput.value = num;
                    btnStateTwo.setAttribute('data-count-rotate', res);
                    btnStateTwo.setAttribute('data-count', num);
                    imgRight.style.transform = `rotate(${res}deg)`;
                }
                else {
                    let res = num - (-90);
                    secondInput.value = num;
                    btnStateTwo.setAttribute('data-count-rotate', res);
                    btnStateTwo.setAttribute('data-count', num);
                    imgRight.style.transform = `rotate(${res}deg)`;
                }
            }
            // if(num > 90) {
            //     num = 90;
            // }

            // if(num < -90) {
            //     num = -90;
            // }

            // secondInput.value = num;

            // changeMaxWidthInput();
            
            // btnStateTwo.setAttribute('data-count', num);
            // imgRight.style.transform = `rotate(${num}deg)`;
            checkIndent();
        }
        checkIndent();
    }

    firstInput.addEventListener("change", (e)=> {
        const currentNumber = Number(e.target.value);
        changeValueInput(currentNumber, btnStateOne);
    });

    secondInput.addEventListener("change", (e)=> {
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

