const playBtn = document.querySelector('#playbtn');
const contentContainer = document.querySelector('.content-container');
const h1Text = document.querySelector('#h1Text');

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

    submitButton.addEventListener('click', () => {
       playBtn.removeEventListener('click', playBtnHandler);
       userField.remove();
       text1.remove();
       submitButton.remove();
        
       const welcomeText = document.createElement('h3');
       welcomeText.innerText = 'Hello, '+userField.value+'!';
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

       selectButton.addEventListener('click', () => {
            submitButton.removeEventListener('click', playBtnHandler);
            h3Text.remove();
            selectButton.remove();
            dropDown.remove();
            select.remove();

            const selectedValue = select.value;

            const rangeText = document.createElement('h4');
            rangeText.innerText = 'The Max Range of you will Guess is '+selectedValue+'!';

            contentContainer.append(rangeText);
       });

    });

}

playBtn.addEventListener('click', playBtnHandler)



