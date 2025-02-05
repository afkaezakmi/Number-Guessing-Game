const playBtn = document.querySelector('#playbtn');
const contentContainer = document.querySelector('.content-container');
const h1Text = document.querySelector('#h1Text');
const centerContainer = document.querySelector('.center-container');

//This function will be processed once the plyBtn is clicked
//After pressed, it will remove the first contents inside the contentContainer and new elements will be presented
const playBtnHandler = () => {
    playBtn.remove();

    h1Text.classList.add('h1Text');

    const userField = document.createElement('input');
    userField.setAttribute('type', 'text');
    userField.setAttribute('placeholder', 'ex. QWERTY123');
    userField.classList.add('userField');
    contentContainer.append(userField);

    const text1 = document.createElement('h3');
    text1.innerText = 'Enter your Username';
    contentContainer.append(text1);

    const submitButton = document.createElement('button');
    submitButton.innerText = 'SUBMIT';
    submitButton.classList.add('submitButton');
    contentContainer.append(submitButton);
    submitButton.disabled = true;

    userField.addEventListener('input', () => {
        const userLength = userField.value;

        if(userLength.length >= 3){
            submitButton.disabled = false;
        } else if (userLength.length < 3){
            submitButton.disabled = true;
        }
    });

    const submitEventRemover = () => {
        playBtn.removeEventListener('click', playBtnHandler);
        const username = userField.value;
        submitBtnHandler(username);
        submitButton.removeEventListener('click', submitEventRemover);
    }

    submitButton.addEventListener('click', submitEventRemover);
};

const submitBtnHandler = (username) => {
    contentContainer.innerHTML = '';
    
    const welcomeText = document.createElement('h3');
    welcomeText.innerText = 'Hello, '+username+'!';
    contentContainer.append(welcomeText);

    const h3Text = document.createElement('h5');
    h3Text.innerText = 'SET THE MAX RANGE OF THE NUMBER YOU WILL GUESS!';
    contentContainer.append(h3Text);

    const dropDown = document.createElement('label');
    dropDown.setAttribute('for', 'selectContainer');
    dropDown.innerText = 'Choose:';
    
    const select = document.createElement('select');
    select.setAttribute('id', 'selectContainer');
    select.classList.add('optionContainer');
    let num = 50;
    for(let i = 0; i <= 4; i++){
        const option = document.createElement('option');
        option.setAttribute('value', String(num));
        option.innerText = String(num);
        num += 50;
        select.append(option);
    }
    contentContainer.append(dropDown);
    contentContainer.append(select);

    const selectButton = document.createElement('button');
    selectButton.innerText = 'Select';
    selectButton.classList.add('submitButton');
    contentContainer.append(selectButton);

    const selectEventRemover = () => {
    selectButton.removeEventListener('click', selectEventRemover);
    const selectedRange = select.value;
    selectBtnHandler(username, selectedRange);
    }

    selectButton.addEventListener('click', selectEventRemover);
};

const selectBtnHandler = (username, selectedRange) => {
    contentContainer.innerHTML = '';

    const randomNumber = Math.floor(Math.random() * selectedRange) + 1;


    const welcomeText = document.createElement('h3');
    welcomeText.innerText = 'Hello, '+username+'!';
    contentContainer.append(welcomeText);

    const rangeText = document.createElement('h4');
    rangeText.innerText = 'The Max Range of you will Guess is '+selectedRange+'!';
    contentContainer.append(rangeText);

    const guessField = document.createElement('input');
    guessField.classList.add('guessField');
    guessField.disabled = true;
    contentContainer.append(guessField);

    const resultText = document.createElement('h4');
    resultText.innerText = 'First guess is Free!';
    contentContainer.append(resultText);

    const buttonDiv = document.createElement('div');
    buttonDiv.classList.add('buttonDiv');
    centerContainer.append(buttonDiv);

    let btnValue = 9;
    for(let i = btnValue; i >= 0; i--){
        const buttons = document.createElement('button');
        buttons.innerText = String(btnValue);
        buttons.value = btnValue;
        buttons.classList.add('digits')
        buttonDiv.append(buttons);
        btnValue -= 1;
    }

    const backspace = document.createElement('button');
    backspace.innerText = '<-';
    backspace.classList.add('backSpace');
    backspace.style.backgroundColor = 'red';
    buttonDiv.append(backspace);

    const enterButton = document.createElement('button');
    enterButton.innerText = 'Submit';
    enterButton.style.backgroundColor = 'limegreen';
    enterButton.classList.add('enter');
    enterButton.disabled = true;
    buttonDiv.append(enterButton);

    const updateSubmitButton = () => {
        if(guessField.value.length > 0){
        enterButton.disabled = false;
        } else {
            enterButton.disabled = true;
        }
    };

    const buttonDisabler = () => {
        const numBtnDisabler = document.querySelectorAll('.digits');
        if(guessField.value.length >= 3){
            numBtnDisabler.forEach(buttons => {
                buttons.disabled = true;       
            });
        } else {
            numBtnDisabler.forEach(buttons => {
                buttons.disabled = false;       
            });
        }
    }

    const numButton = document.querySelectorAll('.digits');
    numButton.forEach(number => {
        number.addEventListener('click', ()=> {
            const value = number.getAttribute('value');
            if(value){
                guessField.value += value;
                updateSubmitButton();
                buttonDisabler();
            }
        });
    });

    backspace.addEventListener('click', () => {
    guessField.value = guessField.value.slice(0, -1);
    updateSubmitButton();
    buttonDisabler();
    });

    guessField.addEventListener('input', updateSubmitButton);

    enterButton.addEventListener('click', () => {
        processGame(guessField.value, guessField, randomNumber, resultText);
    });
    
};

playBtn.addEventListener('click', playBtnHandler)

const processGame = (guess, guessField, range, resultText) => {

    let win;

   if (guess == range){
        resultText.innerText = 'YOUR GUESS IS CORRECT!';
        win = true;
        verdictContainer(range, win);
   } else if (guess > range) {
        win = false;
        resultText.innerText = `${guess} IS HIGHER`;
   } else {
        win = false;
        resultText.innerText = `${guess} IS LOWER!`;
   }

   guessField.value = '';
}

const verdictContainer = (rangeData, winOrLose) => {
    const guessContainer = document.createElement('div');
    guessContainer.classList.add('guessContainer');
    const randomNumber = document.createElement('h5');
    randomNumber.innerText = `THE NUMBER IS ${rangeData}!`;
    guessContainer.append(randomNumber);
    contentContainer.append(guessContainer);
    
    if (winOrLose === true){
        guessContainer.style.backgroundColor = 'limegreen';
    } else {
        guessContainer.style.backgroundColor = 'red';
    }
}