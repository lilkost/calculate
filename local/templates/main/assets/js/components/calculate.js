const calculate = () => {
    const items = document.querySelectorAll('.result-slider__slide');
    const specificationNode = document.querySelector('.specification');
    const specificationBodyNode = document.querySelector('.specification__table-body')
    
    // текст на кнопках
    const textBtnStatus = {
        default: 'Добавить',
        disabled: 'Добавлено'
    }

    // преобразование чисел 
    const numberWithSpaces = (x)=> {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

    // Функция перерендера компонента после удаления элемента из таблицы
    const reRenderTableItems = () => {
        const countElementBody = specificationBodyNode.childElementCount;

        if(countElementBody === 0) {
            specificationNode.classList.remove('is-open');
        }
    }

    // Функция подсчета кол-ва в конце таблицы
    const allCounting = () => {
        const infoNode = document.querySelector('.specification__result-info');
        const priceNode = document.querySelector('.specification__result-price');
        const rowsBodyTable = document.querySelectorAll('.specification__table-body-row');

        let allPrice = 0;
        let allCount = 0;
        let allInfo = 0;

        rowsBodyTable.forEach(row=> {
            allPrice+= (Number(row.getAttribute('data-count')) * Number(row.getAttribute('data-price')))
            allCount+=Number(row.getAttribute('data-count'));
            allInfo+=Number(row.getAttribute('data-info')) * Number(row.getAttribute('data-count'));
        });
        infoNode.innerHTML = `Итого: ${numberWithSpaces(allCount)} шт. общей теплоотдачей ${numberWithSpaces(allInfo)} Вт`;
        priceNode.innerHTML = `${numberWithSpaces(allPrice.toFixed(2))} руб.`;
    }

    const createHTMLline = (itm) => {
        const idElement = specificationBodyNode.childElementCount + 1;
        const node = `
            <div class="specification__table-body-row" 
                data-id-el="${idElement}"
                data-article="${itm.getAttribute('data-article')}"
                data-name="${itm.getAttribute('data-name')}"
                data-id="${itm.getAttribute('data-id')}" 
                data-count="${itm.getAttribute('data-count')}" 
                data-price="${itm.getAttribute('data-price')}"
                data-all-price=""
                data-info="${itm.getAttribute('data-info')}"
            >
            <div class="specification__table-body-col">${idElement}</div>
            <div class="specification__table-body-col">${itm.getAttribute('data-article')}</div>
            <div class="specification__table-body-col">${itm.getAttribute('data-name')}</div>
            <div class="specification__table-body-col">${itm.getAttribute('data-info')}</div>
            <div class="specification__table-body-col col-count">
                <input type="text" value="${itm.getAttribute('data-count')}">
            </div>
            <div class="specification__table-body-col col-price">${numberWithSpaces(Number(itm.getAttribute('data-all-price')))}</div>
            <div class="specification__table-body-col col-delete">
            <button>
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.58333 6.41667H17.4167M9.16667 9.16667V16.5M12.8333 9.16667V16.5M9.16667 2.75H12.8333C13.0764 2.75 13.3096 2.84658 13.4815 3.01849C13.6534 3.19039 13.75 3.42355 13.75 3.66667V6.41667H8.25V3.66667C8.25 3.42355 8.34658 3.19039 8.51848 3.01849C8.69039 2.84658 8.92355 2.75 9.16667 2.75ZM5.5 6.41667H16.5V18.3333C16.5 18.5764 16.4034 18.8096 16.2315 18.9815C16.0596 19.1534 15.8264 19.25 15.5833 19.25H6.41667C6.17355 19.25 5.94039 19.1534 5.76848 18.9815C5.59658 18.8096 5.5 18.5764 5.5 18.3333V6.41667Z" stroke="#E10D49" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
        </div>
        `;
        specificationBodyNode.insertAdjacentHTML("beforeend", node);

        // Работа с элементами таблицы
        const items = specificationBodyNode.querySelectorAll('.specification__table-body-row');
        const itemCards = document.querySelectorAll('.result-slider__slide');

        items.forEach(item=> {
            const input = item.querySelector('.col-count input');
            const btnDelete = item.querySelector('.col-delete button');
            const priceNode = item.querySelector('.col-price');

            // Изменение цены и количества в таблице
            input.addEventListener('input', (e)=> {
                if(e.target.value <=0) {
                    e.target.value = 1;
                }
                const curentItemValue = Number(e.target.value) < 1 ? 1 : Number(e.target.value);
                const currentPrice = Number(curentItemValue * item.getAttribute('data-price')).toFixed(2);
                item.setAttribute('data-all-price', currentPrice);
                priceNode.innerHTML = numberWithSpaces(currentPrice);
                item.setAttribute('data-count', curentItemValue)
                // изменение кол-во и цены в элементе
                itemCards.forEach(card=> {
                    if(card.getAttribute('data-id') === item.getAttribute('data-id')) {
                        card.setAttribute('data-all-price', currentPrice);
                        card.setAttribute('data-count', curentItemValue);
                        card.querySelector('.result-slider__slide-count').innerHTML = curentItemValue;
                        card.querySelector('.result-slider__slide-price span').innerHTML = numberWithSpaces(currentPrice);
                    }
                });
                allCounting();
            });
            
            // Удалить элемент из таблицы
            btnDelete.addEventListener('click', ()=> {
                itemCards.forEach(card=> {
                    if(card.getAttribute('data-id') === item.getAttribute('data-id')){
                        const currentCard = card;
                        const currentCardBtn = currentCard.querySelector('.result-slider__slide-btn');
                        currentCardBtn.classList.remove('is-disabled')
                        currentCardBtn.removeAttribute('disabled');
                        currentCardBtn.innerHTML = textBtnStatus.default;
                        item.remove();
                        // перерендер компонета
                        reRenderTableItems();
                    }
                })
                allCounting();
                // Пересчет номеров
                document.querySelectorAll('.specification__table-body-row').forEach((rowI, key)=>{
                    const firstItem = rowI.querySelectorAll('.specification__table-body-col')[0];
                    rowI.setAttribute('data-id-el', key+1);
                    firstItem.innerHTML = key + 1;
                });
            });
        });
    }

    // создание функции для генерации таблицы
    const addItemToTable = (itm) =>{
        const currentItem = itm;
        createHTMLline(itm);
        specificationNode.classList.add('is-open');
    }
    // Функция пересчета в таблице
    const setValueAndCountInputForItems = (itm, currentCount, currentPrice) => {
        if(!document.querySelectorAll('.specification__table-body-row')) return;

        document.querySelectorAll('.specification__table-body-row').forEach(row=> {
            if(row.getAttribute('data-id') === itm.getAttribute('data-id')) {
                const input = row.querySelector('.col-count input');
                const rowPrice = row.querySelector('.col-price');
                
                row.setAttribute('data-count', currentCount);
                row.setAttribute('data-all-price', currentPrice);
                input.value = currentCount;
                rowPrice.innerHTML = numberWithSpaces(currentPrice);
            }
        });
        allCounting();
    }

    // Работа с внешним видом кнопки
    const addItemAddBtnSetStatus = (btn) => {
        const currentItemAddBtn = btn;
        
        currentItemAddBtn.classList.add('is-disabled');
        currentItemAddBtn.setAttribute('disabled', true);
        currentItemAddBtn.innerHTML = textBtnStatus.disabled;
    }

    // работа с карточкой товара
    document.querySelectorAll('.result-slider__slide').forEach(itm=> {
        const plus = itm.querySelector('.result-slider__slide-plus');
        const minus = itm.querySelector('.result-slider__slide-minus');
        const countNode = itm.querySelector('.result-slider__slide-count');
        const addBtn = itm.querySelector('.result-slider__slide-btn');
        // Добавить кол-во
        plus.addEventListener('click', ()=> {
            let currentCount = Number(itm.getAttribute('data-count'));
            let price = Number(itm.getAttribute('data-price'));
            const nodePrice = itm.querySelector('.result-slider__slide-price span');

            currentCount+=1;
            countNode.innerHTML = currentCount;
            itm.setAttribute('data-count', currentCount);
            
            // price
            const currentPrice = (price * currentCount).toFixed(2);
            itm.setAttribute('data-all-price', currentPrice);
            nodePrice.innerHTML = numberWithSpaces(currentPrice);

            // изменение инпута
            setValueAndCountInputForItems(itm, currentCount, currentPrice);
        });
        // Уменьшить количество
        minus.addEventListener('click', ()=>{
            let currentCount = Number(itm.getAttribute('data-count'));
            const nodePrice = itm.querySelector('.result-slider__slide-price span');
            if(currentCount <= 1) return;

            currentCount-=1;
            countNode.innerHTML = currentCount;
            itm.setAttribute('data-count', currentCount);

            // price
            const currentPrice = (Number(itm.getAttribute('data-all-price')) - Number(itm.getAttribute('data-price'))).toFixed(2);
            itm.setAttribute('data-all-price', currentPrice);
            nodePrice.innerHTML = numberWithSpaces(currentPrice);

            // изменение инпута
            setValueAndCountInputForItems(itm, currentCount, currentPrice);
        });

        // добавить в таблицу элемент
        addBtn.addEventListener('click', ()=> {
            addItemToTable(itm);
            addItemAddBtnSetStatus(addBtn);
            allCounting();
        });
    })
}

export default calculate;