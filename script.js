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
    for(let i = 0; i <= 2; i++){
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
    rangeText.innerText = ' Max Range is '+selectedRange+'!';
    rangeText.classList.add('rangeText');
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

    updateSubmitButton(guessField, enterButton);
    
    const numButton = document.querySelectorAll('.digits');
    numButton.forEach(number => {
        number.addEventListener('click', ()=> {
            const value = number.getAttribute('value');
            if(value){
                guessField.value += value;
                updateSubmitButton(guessField, enterButton);
                buttonDisabler();
            }
        });
    });

    const buttonDisabler = () => {
        if(guessField.value.length >= 3){
            numButton.forEach(buttons => {
                buttons.disabled = true;       
            });
        } else {
            numButton.forEach(buttons => {
                buttons.disabled = false;       
            });
        }
    }

    

    backspace.addEventListener('click', () => {
    guessField.value = guessField.value.slice(0, -1);
    updateSubmitButton(guessField, enterButton);
    buttonDisabler();
    });

    guessField.addEventListener('input', updateSubmitButton(guessField, enterButton));
    enterButton.addEventListener('click', () => {
        processGame(guessField.value, guessField, randomNumber, resultText, numButton, backspace, enterButton, selectedRange, username, buttonDiv, welcomeText, rangeText, resultText);
    });
};

playBtn.addEventListener('click', playBtnHandler)

const gameCondition = (selectedRange) => {
    let guessCounter = 0;
    if(selectedRange == 50){
        guessCounter = 6;
    } else if (selectedRange == 100){
        guessCounter = 9;
    } else {
        guessCounter = 11;
    }
    return guessCounter;
}

let remainingTries;
const remainingTriesCount = document.createElement('h3');
const processGame = (guess, guessField, range, resultText, buttonDisabler, backspace, enterButton, rangeSelected, username, buttonDiv, welcomeText, rangeText) => {
    
    guessField.value = '';
    buttonDisabler.forEach(button => {
        button.disabled = false;
    });


    const tries = gameCondition(rangeSelected);
    
    if(remainingTries === undefined){
        remainingTries = tries;
    }

    let win;
    const finishDiv = document.createElement('div');
    finishDiv.classList.add('finishDiv');

    const finishButton = document.createElement('button');
    finishButton.innerText = 'Finish';
    finishButton.classList.add('finishButton');

    const playAgainButton = document.createElement('button');
    playAgainButton.innerText = 'Play Again';
    playAgainButton.classList.add('finishButton');

   if (guess == range){
        resultText.innerText = 'YOUR GUESS IS CORRECT!';
        win = true;
        guessField.value = guess;
        afterGamebuttonDisabler(buttonDisabler, backspace)
        verdictContainer(range, win);
        centerContainer.append(finishDiv);
        finishDiv.append(finishButton);
        finishDiv.append(playAgainButton);

   } else {
    remainingTries--;
    remainingTriesCount.innerText = `TRIES LEFT: ${remainingTries}`;
    contentContainer.append(remainingTriesCount);

    if (remainingTries == 0){
        resultText.innerText = 'YOU DON\'T HAVE ANYMORE TRIES!';
        centerContainer.append(finishDiv);
        finishDiv.append(finishButton);
        finishDiv.append(playAgainButton);
        guessField.value = '';
        afterGamebuttonDisabler(buttonDisabler, backspace)
        verdictContainer(range, win);

    } else {
        if (guess > range) {
            win = false;
            resultText.innerText = `${guess} IS HIGHER`;
            guessField.value = '';
        } else {
            win = false;
            resultText.innerText = `${guess} IS LOWER!`;
            guessField.value = '';
        }
          
    }
   }
   updateSubmitButton(guessField, enterButton, win);

   finishButton.addEventListener('click', () => {
        location.reload();
   });

   playAgainButton.addEventListener('click', ()=>{
        
        // submitBtnHandler(username);
        historyMaker(username, rangeSelected, range);
        playBtnHandler();
        remainingTriesCount.remove();
        guessContainer.remove();
        resultText.remove();
        guessField.remove();
        buttonDiv.remove();
        backspace.remove();
        enterButton.remove();
        finishDiv.remove();
        welcomeText.remove();
        rangeText.remove();
        remainingTries = undefined;
   });
}

const historyList = document.querySelector('.history-container');
let tryCounter = 0;
const historyMaker = (username, rangeSelected, range) => {
    tryCounter++;
    
    const historyDiv = document.createElement('div');
    historyDiv.classList.add('historyDiv');

    const historyHead = document.createElement('h3');
    historyHead.innerText = `TRY #${tryCounter}`;
    historyHead.style.textAlign = 'center';

    const usernameText = document.createElement('h4');
    usernameText.innerText = `USERNAME: ${username}`;

    const rangeText = document.createElement('h4');
    rangeText.innerText = `RANGE: ${rangeSelected}`;

    const randomNumberText = document.createElement('h4');
    randomNumberText.innerText = `NUMBER: ${range}`;

    historyDiv.append(historyHead, usernameText, rangeText, randomNumberText);
    historyList.append(historyDiv);

}

const guessContainer = document.createElement('div');
const verdictContainer = (rangeData, winOrLose) => {
    guessContainer.innerHTML = '';
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

const updateSubmitButton = (guessField, enterButton, win) => {
    if(guessField.value.length > 0){
        enterButton.disabled = false;
    } else {
        enterButton.disabled = true;
    }

    if (win) {
        enterButton.disabled = true;
    }
};

const afterGamebuttonDisabler = (numberButtons, backspace) => {
    numberButtons.forEach(button => {
        button.disabled = true;
    });
    backspace.disabled = true;
}

