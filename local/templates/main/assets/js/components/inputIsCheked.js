const isInputCheked = () => {
    const inputs = document.querySelectorAll('.filter__input');
    const inputsColor = document.querySelectorAll('.filter-color__item');
    const typeBody = document.querySelectorAll('.execution-type__el');

    inputs.forEach(input=> {
        input.addEventListener('mouseover', ()=> {
            input.closest('.filter__item').style.border = '1px solid var(--color-red)';
        });
        input.addEventListener('mouseleave', ()=> {
            input.closest('.filter__item').style.border = '1px solid #C0C0C0';
        })

        input.addEventListener('click', ()=> {
            const currentName = input.name;
            const currentInput = input;
            const parentElCurrentInput = currentInput.closest('.filter__item');
            let arrCurrentNameEl = [];

            inputs.forEach(inp=> {
                if(inp.name === currentName) {
                    arrCurrentNameEl.push(inp);
                }
            });

            arrCurrentNameEl.forEach(inp=> {
                inp.closest('.filter__item').classList.remove('is-active');
            });

            parentElCurrentInput.classList.add('is-active');

            if(currentInput.closest('.execution-type')) {
                console.log(currentInput)
                const parentEl = currentInput.closest('.filter__item');
                typeBody.forEach(body=> {
                    body.classList.remove('is-active');

                    if(body.getAttribute('data-id') === parentEl.getAttribute('data-id')) {
                        body.classList.add('is-active')
                        console.log(body)
                    }

                })
            }
        })
    });

    inputsColor.forEach(input=> {
        input.addEventListener('mouseover', ()=> {
            input.style.border = '1px solid var(--color-red)';
        });
        input.addEventListener('mouseleave', ()=> {
            input.style.border = '1px solid #C0C0C0';
        })

        input.addEventListener('click', ()=> {

            inputsColor.forEach(inp=> {
                inp.classList.remove('is-active');
            });

            input.classList.add('is-active');
        });
    });
    

}

export default isInputCheked;