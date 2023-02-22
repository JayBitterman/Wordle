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

goButton.addEventListener("click", function() {
  const userWord = userText.value.toLowerCase();

  // check if userWord matches secret word, display userWord in boxes, etc.

  // word length error
  if(userWord.length < 5){
    lengthError.style.visibility = "visible";
    wordError.style.visibility = "hidden";
  }

  // not in the word bank error
  else if(!wordList.includes(userWord)){
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

    // default all boxes to incorrect
    for(let x = 0; x < 5; x ++){
      boxes[x].style.backgroundColor = "grey";
    }

    for(let i = 0; i < 5; i ++){
      // fill boxes with letters from user word
      boxes[i].textContent = userWord[i];
      let letter = document.getElementById(userWord[i].toUpperCase());

      // conditions for changing letter green
      if(userWord[i] == secretWord[i]){
        boxes[i].style.backgroundColor = "green";
        letter.style.color = "green";
      }

      // conditions for changing box yellow
      else if(secretWord.includes(userWord[i])){
          for(let x = 0; x < 5; x ++){
            if(letter.textContent.toLowerCase() == secretWord[x] && userWord[x] != secretWord[x]){
              boxes[i].style.backgroundColor = "yellow";
            }
          }

        // conditions for changing letter yellow
        if(letter.style.color != "green"){
          letter.style.color = "#e8ca11";
        }
      }

      // letter is not in the word
      else{
        letter.style.color = "red";
      }
    }

    line_count += 1;

    // user won
    if(userWord === secretWord){
      lengthError.style.color = "green";
      lengthError.textContent = "Correct!";
      setNewGame();
    }

    // all lives are used up, user lost
    else if(line_count === 6){
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

