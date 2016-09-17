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

let middleBtn = PlayGame.getMiddleBtn()
let restart = document.getElementById('restart')
restart.addEventListener('click', () => PlayGame.resetGame())

for (var i = 0; i < padNodeList.length; ++i) {
  padList.push(padNodeList[i])
}

// console.log(padList) => [{},{},{},{}]


// Play the game !
middleBtn.addEventListener('click', function(){

  //prevent the user from clicking again after the game is launched
  if(!PlayGame.isStarted()){

    //generate the first random arr
    PlayGame.init()

    // Simon 'says' his first random array
    // then the user enters his answer
    // the isOk() method compare them
    // if lost => game over, else => next level
    setTimeout(function(){
      PlayGame.startGame(padList)
    }, 1000)

  }
})




