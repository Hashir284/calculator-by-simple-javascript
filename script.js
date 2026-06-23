let btn = document.querySelectorAll('button')
let firstElement = document.getElementById('first')
let secondElement = document.getElementById('second')

btn.forEach(e => {
    e.addEventListener('click', () => {
        let first = firstElement.innerText
        let second = secondElement.innerText

        if (!isNaN(e.innerText) || e.innerText == '.') {
            if (first == 0 && e.innerText == '.') {
                firstElement.innerHTML += e.innerText
            }
            else if(first == '0') {
                firstElement.innerHTML = e.innerText
            }
            else {
                firstElement.innerHTML += e.innerText
            }
        }

        if ((e.innerText == '+' || e.innerText == '-' || e.innerText == '/' || e.innerText == '*')) {
            if (first == 0 && second.slice(-1) == '/') {
                    // firstElement.innerText = 'error'
                    // secondElement.innerText = ''
            }
            else{
                if (first != 0 && second == '') {
                if (first.slice(-1) == '.') {
                    first = first.replace(/\.$/, '');
                    secondElement.innerHTML = first + e.innerText
                    firstElement.innerHTML = ''
                }
                else if (first.slice(0, 1) == '.') {
                    if (first.startsWith('.')) {
                        first = first.slice(1)
                    }
                    secondElement.innerHTML = first + e.innerText
                    firstElement.innerHTML = ''
                }
                else {
                    secondElement.innerHTML = first + e.innerText
                    firstElement.innerHTML = ''
                }
            }

            if (second != '' && first != '') {
                let result = calculate(first, second);
                firstElement.innerHTML = ''
                secondElement.innerHTML = result + e.innerText
            }

            if (second != '' && first == '') {
                secondElement.innerText = secondElement.innerText.slice(0, -1) + e.innerText
            }
            }
        }


        if (e.innerText == '=' && second != '' && first != '') {
            if (first == 0 && second.slice(-1) == '/') {
                // firstElement.innerText = 'error'
                // secondElement.innerText = ''
            }
            else{
                let result = calculate(first, second);
            firstElement.innerHTML = result
            secondElement.innerHTML = ''
            }
        }

        if (e.innerText == 'AC') {
            firstElement.innerHTML = ''
            secondElement.innerHTML = ''
        }

        if (e.innerText == 'Del') {
            firstElement.innerHTML = first.slice(0, first.length - 1)
        }

    })
})


let press = document.createElement('div')
press.className = 'absolute top-52 right-52 '
press.id = 'press'
document.addEventListener('keydown', (e) => {
    console.log(e.key);

    press.innerHTML = `You have pressed ${e.key}`

    document.querySelector('#container').appendChild(press)

    if (!isNaN(e.key) || e.key == '.') {
        if ((firstElement.innerText.slice(0, 1) == '0' && e.key == '.') || (firstElement.innerText.slice(0, 2) == '0.')) { firstElement.innerText += e.key }
        else if (firstElement.innerText == 0) { firstElement.innerText = e.key }
        else { firstElement.innerText += e.key }
    }

    if (e.key == '+' || e.key == '-' || e.key == '/' || e.key == '*') {
        if (firstElement.innerText == 0 && secondElement.innerText.slice(-1) == '/') {
                // firstElement.innerText = 'error'
                // secondElement.innerText = ''
            }
            else{
                if (secondElement.innerText.trim() == '') {
            secondElement.innerText = firstElement.innerText + e.key
            firstElement.innerText = ''
            console.log(firstElement.innerText + e.key);
        } else {
            let second = secondElement.innerText
            let first = firstElement.innerText
            if (first.trim() != '' && second.trim() != '') {
                let result = calculate(first, second);

                secondElement.innerHTML = result + e.key
                firstElement.innerHTML = ''
            }
        }

        if (secondElement.innerText != '' && firstElement.innerText == '') {
            secondElement.innerText = secondElement.innerText.slice(0, -1) + e.key
        }
            }
    }

    if (e.ctrlKey && e.key === 'Backspace') {
        firstElement.innerText = '';
    } else if (e.key == 'Backspace') {
        firstElement.innerText = firstElement.innerText.slice(0, -1)
    }


    if ((e.key == '=' || e.key == 'Enter')) {
       if(secondElement.innerText.length > 0){
         let second = secondElement.innerText
    let first = firstElement.innerText
                if (first == 0 && second.slice(-1) == '/') {
                // firstElement.innerText = 'error'
                // secondElement.innerText = ''
            }
        else if(firstElement.innerText != 0){
        let result = calculate(first, second);
        firstElement.innerHTML = result 
        secondElement.innerHTML = ''
        }
       }
    }
});


function calculate(first, second) {
    let operator = second.slice(-1);
    let num = Number(second.slice(0, -1));

    if (operator === '+') return num + Number(first);
    if (operator === '-') return num - Number(first);
    if (operator === '*') return num * Number(first);
    if (operator === '/') return num / Number(first);
}