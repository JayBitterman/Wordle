// Get necessery html elements 
const goButton = document.getElementById("go-button");
const againButton = document.getElementById("again-button");
const wordError = document.getElementById("wordError");
const lengthError = document.getElementById("lengthError");
const userText = document.getElementById("word-input");



// reference to text file with words
let wordList = [];
const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://raw.githubusercontent.com/JayBitterman/Wordle/main/wordBank.txt', false);
xhr.onload = function() {
  if (xhr.readyState === 4 && xhr.status === 200) {
    wordList = xhr.responseText.split("\n");
  }
};
xhr.send(null);

// Secret word
const secretWord = wordList[Math.floor(Math.random() * wordList.length)];

// life/line counter
let line_count = 0;

// set up game sounds
var audio;

goButton.addEventListener("click", function() {
  // set the timer
  let ms = 500;
  const userWord = userText.value.toLowerCase();

  // check if userWord matches secret word, display userWord in boxes, etc.

  // word length error
  if(userWord.length < 5){
    audio = new Audio('Error.wav');
    audio.play();
    lengthError.style.visibility = "visible";
    wordError.style.visibility = "hidden";
  }

  // not in the word bank error
  else if(!wordList.includes(userWord)){
    audio = new Audio('Error.wav');
    audio.play();
    lengthError.style.visibility = "hidden";
    wordError.style.visibility = "visible";
  }

  // input is valid, do checking
  else{

    // make sure errors are not showing
    lengthError.style.visibility = "hidden";
    wordError.style.visibility = "hidden";

    // clear text box
    userText.value = "";

    let boxes = document.getElementById("row" + line_count.toString()).children;

    // update the box and colors 
    for(let i = 0; i < 5; i ++){
      setTimeout(() => {
        let letter = document.getElementById(userWord[i].toUpperCase());

        // conditions for changing letter green
        if(userWord[i] == secretWord[i]){
          boxes[i].style.backgroundColor = "green";
          letter.style.color = "green";
          boxes[i].textContent = userWord[i];
          audio = new Audio('correctGreen.wav');
          audio.volume = 0.8;
          audio.play();
          audio.volume = 1;
        }

        // conditions for changing box yellow
        else if(secretWord.includes(userWord[i])){
          boxes[i].textContent = userWord[i];
            for(let x = 0; x < 5; x ++){
              if(letter.textContent.toLowerCase() == secretWord[x] && userWord[x] != secretWord[x]){
                boxes[i].style.backgroundColor = "yellow";
              }
            }

          // conditions for changing letter yellow
          if(letter.style.color != "green"){
            letter.style.color = "#e8ca11";
          }
          audio = new Audio('on-or-off-light-switch-tap-2585.wav');
          audio.play();
        }

        // the letter is not in the word
        if(boxes[i].style.backgroundColor != "yellow" && boxes[i].style.backgroundColor != "green"){
          boxes[i].style.backgroundColor = "grey";
          letter.style.color = "red";
          boxes[i].textContent = userWord[i];
          audio = new Audio('on-or-off-light-switch-tap-2585.wav');
          audio.play();
        }
      }, ms);
    
      ms += 500;
    }

    line_count += 1;
    
    // user won
    if(userWord === secretWord){
      audio = new Audio('correct-answer-fast-notification-953.wav');
      audio.play();
      lengthError.style.color = "green";
      lengthError.textContent = "Correct!";
      setNewGame();
    }

    // all lives are used up, user lost
    else if(line_count === 6){
      audio = new Audio('Lose.wav');
      audio.play();
      lengthError.textContent = "Sorry! The word was " + secretWord + ".";
      setNewGame();

    }
  }

});

againButton.addEventListener("click", function(){
  document.getElementById("onSubmit").onsubmit = "return true";
});

function setNewGame(){
  goButton.style.display = "none";
  // make sure the enter key is linked to correct button
  goButton.setAttribute("type", "button");
  againButton.setAttribute("type", "submit");

  againButton.style.display = "inline"
  lengthError.style.visibility = "visible";
}

