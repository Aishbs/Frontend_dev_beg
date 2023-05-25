let buffer = "0";
let total = 0;
let prevOperator; 
const screen = document.querySelector('.screen')

function buttonClick(value) {
  if(isNaN(parseInt(value))) {
    handleSymbol(value);
  }
  else {
    handleNum(value);
  }
  rerender();
}
function handleNum(number) {
  if (buffer === "0") {
    buffer = number;
  }
  else {
    buffer += number;
  }
}

function handleMath(value) {
  if (buffer === "0") {
    return;
  }

  const intBuffer = parseInt(buffer);
  if (total === 0) {
    total = intBuffer;
  } else {
    mathOperate(intBuffer);
  }
  prevOperator = value;
  buffer = "0"
}

function mathOperate(intBuffer) {
  switch(prevOperator) {
    case '=':
    case '÷':
      total /= intBuffer;
      break;  
    case '×':
      total *= intBuffer;
      break;
    case '+':
      total += intBuffer;
      break;
    case '-':
      total -= intBuffer;
      break;
  } 
}
function handleSymbol(symbol) {
  switch(symbol) {
    case 'C':
      buffer = "0";
      break;
    case '←':
      if (buffer.length == 1) {
        buffer = "0";
      } else {
        buffer = buffer.substring(0, buffer.length - 1);
      }
      break
    case '=':
      if (prevOperator === null) {
        return;
      }
      mathOperate(parseInt(buffer));
      prevOperator  = null;
      buffer = total;
      total = 0;
      break;
    case '÷': 
    case '×':
    case '+':
    case '-':
      handleMath(symbol);
      break;
  }
}

function rerender() {
  screen.innerText = buffer;
}

function init() {
  document
    .querySelector(".calc-btns")
    .addEventListener("click", function (event) {
      buttonClick(event.target.innerText);
    });
}

init();