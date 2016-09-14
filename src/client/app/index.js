import StyleSheet from './style.scss'
import PlayGame from './PlayGame.js'
import Simon from './Simon.js'

//
const padNodeList = document.querySelectorAll('.pad')
//
let padList = []
//
let clickedItems = []
let reference = []
let msg = {
  start: "Start",
  init: "Game Started"
}

//elements
let middleBtn = document.getElementById('middle-btn')
middleBtn.firstChild.innerHTML = msg.start


for (var i = 0; i < padNodeList.length; ++i) {
  padList.push(padNodeList[i])
}

// console.log(padList) => [{},{},{},{}]


// Play the game !
middleBtn.addEventListener('click', function(){
  if(!PlayGame.isStarted()){
    PlayGame.init()
    middleBtn.firstChild.innerHTML = msg.init
    PlayGame.startGame()
  }
})


//display simon random array !
reference = Simon.getRandArr()
reference.map( (e) => console.log(e) )

//user input
PlayGame.userPlay(padList, PlayGame.isOk)
// return true => next step
// return false => game over
// simon play the game
//...



