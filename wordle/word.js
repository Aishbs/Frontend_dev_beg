const LENGTH = 5;
const GUESS = 6;
const letters = document.querySelectorAll('.letter');
const loading = document.querySelector(".info-bar")

async function init() {
  let currentGuess = "";
  let currentRow = 0;
  let isLoading = true;
  let done = false;

  const res = await fetch(" https://words.dev-apis.com/word-of-the-day?random=1");
  const resObj = await res.json();
  const word = resObj.word.toUpperCase();
  const wordParts = word.split("");
  
  setLoading(false);
  isLoading = false;

  console.log(word);

  function addLetter(letter) {
    if (currentGuess.length < LENGTH) {
      currentGuess += letter;
    } else {
      currentGuess = currentGuess.substring(0, currentGuess.length - 1) + letter;
    }
    letters[LENGTH * currentRow + currentGuess.length - 1].innerText = letter;
  }

  async function commit() {
    if (currentGuess.length != LENGTH) {
      return;
    } 

    isLoading = true;
    setLoading(isLoading);
    const res = await fetch("https://words.dev-apis.com/validate-word", {
      method: "POST",
      body: JSON.stringify({word: currentGuess})
    })

    const { validWord } = await res.json();
    isLoading = false;
    setLoading(isLoading);

    // not valid, mark the word as invalid and return
    if (!validWord) {
      markInvalidWord();
      return;
    }

    const guessParts = currentGuess.split("");
    const map = makeMap(wordParts);
      

    for (let i = 0; i < LENGTH; i++) {
      if (guessParts[i] === wordParts[i]) {
        letters[currentRow * LENGTH + i].classList.add("correct");
        map[guessParts[i]]--;
      }
    }

    for (let i = 0; i < LENGTH; i++) {
      if (guessParts[i] === wordParts[i]) {
        // do nothing
      } else if (wordParts.includes(guessParts[i]) && map[guessParts[i]] > 0) {
        letters[currentRow * LENGTH + i].classList.add("close");
        map[guessParts[i]]--;
      } else {
        letters[currentRow * LENGTH + i].classList.add("wrong");
      }
    }
    currentRow++;

    if (currentGuess === word) {
      alert("YOU WIN");
      document.querySelector(".brand").classList.add("winner");
      done = true;
      return;
    } else if (currentRow === GUESS) {
      alert(`you lose, the word was ${word}`);
      done = true;
    }
    
    currentGuess = "";

  }

  function backspace() {
    currentGuess = currentGuess.substring(0, currentGuess.length - 1);
    letters[LENGTH * currentRow + currentGuess.length].innerText = "";
  }

  function markInvalidWord() {
    for (let i = 0; i < LENGTH; i++) {
      letters[currentRow * LENGTH + i].classList.remove("invalid");

      setTimeout(function () {
        letters[currentRow * LENGTH + i].classList.add("invalid");
      }, 10);
    }
  }

  document.addEventListener('keydown', function handleKeyPass (event) {
    if ( done || isLoading) {
      //do nothing
      return;
    }

    const action = event.key;

    if (action === "Enter") {
      commit();
    } else if (action === "Backspace") {
      backspace();
    } else if (isLetter(action)) {
      addLetter(action.toUpperCase())
    } else {
      // do nothing
    }
  })
}

function isLetter(letter) {
  return /^[a-zA-Z]$/.test(letter);
}

function setLoading (isLoading) {
  loading.classList.toggle('hidden', !isLoading)
}

function makeMap(array) {
  const obj = {};
  for (let i = 0; i < array.length; i++) {
    const letter = array[i];
    if (obj[letter]) {
      obj[letter]++;
    } else {
      obj[letter] = 1;
    }
  }
  return obj;
}

init();