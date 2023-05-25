const time = document.getElementById('time')
const timeDiv = document.getElementById('time-box')
const greeting = document.getElementById('greeting')
const name = document.getElementById('name')
const focus = document.getElementById('focus')
const btn = document.getElementById('format')
let amPm = null

function showTime() {
  let today = new Date()
  let hour = today.getHours()
  let min = today.getMinutes()
  let sec = today.getSeconds()

  min = addZero(min)
  sec = addZero(sec)
  setBackground(hour)

  if(btn.value == '12-hour') {
    show12HourFormat(hour, min, sec);
  } else {
    show24hourformat(hour, min, sec);
  }

  btn.addEventListener('change', () => {
    if(btn.value == '12-hour') {
      show12HourFormat(hour, min, sec);
    } else {
      show24hourformat(hour, min, sec);
    }
  })
}


function show24hourformat(hour, min, sec) {
  time.textContent = `${hour}:${min}:${sec}`
  setTimeout(showTime, 1000);
}  

function show12HourFormat(hour, min, sec) {
  amPm = hour >= 12 ? 'PM': 'AM';
  hour = hour % 12 || 12;
  time.textContent = `${hour}:${min}:${sec} ${amPm}`
  setTimeout(showTime, 1000);
}
  
function addZero(n) {
  return (parseInt(n, 10) < 10? '0':'') + n
}

function setBackground(hour) {

  if (hour < 12) {
    document.body.style.backgroundImage = `url('background-img/morning.jpg')`
    greeting.textContent = 'Good Morning'
  } else if(hour < 18) {
    document.body.style.backgroundImage = `url('background-img/afternoon.jpg')`
    greeting.textContent = 'Good Afternoon'
  } else {
    document.body.style.backgroundImage = `url('background-img/night.jpg')`
    greeting.textContent = 'Good Evening'
    document.body.style.color = 'white'
  }

}

function getName() {
  if (localStorage.getItem('name') === null) {
    name.textContent = '[Enter Name]'
  } else {
    name.textContent = localStorage.getItem('name')
  }
}

function setName(e) {
  if(e.type === 'keypress') {
    if(e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('name', e.target.innerText)
      name.blur()
    }
  } else {
    localStorage.setItem('name', e.target.innerText)
  }
}

function getFocus() {
  if (localStorage.getItem('focus') === null) {
    focus.textContent = '[Enter Focus]'
  } else {
    focus.textContent = localStorage.getItem('focus')
  }
}


function setFocus(e) {
  if(e.type === 'keypress') {
    if(e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('focus', e.target.innerText)
      focus.blur()
    }
  } else {
    localStorage.setItem('focus', e.target.innerText)
  }
}

name.addEventListener('keypress', setName)
name.addEventListener('blur', setName)

focus.addEventListener('keypress', setFocus)
focus.addEventListener('blur', setFocus)

showTime() 
getName();
getFocus();
