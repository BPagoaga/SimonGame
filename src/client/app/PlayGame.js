import Simon from './Simon.js'

const PlayGame = (() => {
  //private attributes
  let started = false
  let loser = false
  let stage = 0
  let step = Simon.getRandArr().length
  let msg = {
    start: "Start",
    init: "Game Started",
    simon: "Simon Playing",
    user: "Your Turn",
    over: "Game Over !",
  }
  let handler

  let players = {
    red: document.querySelector('#redsound'),
    green: document.querySelector('#greensound'),
    blue: document.querySelector('#bluesound'),
    yellow: document.querySelector('#yellowsound')
  }


  //elements
  let middleBtn = document.getElementById('middle-btn')
  middleBtn.firstChild.innerHTML = msg.start

  let stageMsg = document.getElementById('stage')
  stageMsg.innerHTML = "Stage: "+stage+', Steps: '+step

  //public methodes
  return {

    init(){
      // creating a random array
      let initRandArr = Simon.generateRandArr(5)
      middleBtn.firstChild.innerHTML = msg.init
      step = Simon.getRandArr().length
      stageMsg.innerHTML = "Stage: "+stage+', Steps: '+step
    },

    startGame(padList){
      started = true
      console.log(Simon.getRandArr())
      PlayGame.simonPlay(padList)
      middleBtn.firstChild.innerHTML = msg.simon
    },

    userPlay(arr){
      // add a counter for the click
      let c = 0

      //declare the handler only once so the event does not fire multiple times with one click
      if(!handler){
        handler = function(event){

          let pad = event.currentTarget
          players[pad.id].play()
          step--
          stageMsg.innerHTML = "Stage: "+stage+', Steps: '+step

          if(c < Simon.getRandArr().length){
            Simon.addToArr(pad.id)
            c++

            if(c === Simon.getRandArr().length){
              arr.map((pad, i) => {
                pad.removeEventListener('click', handler, false)
              })
              let loser = !PlayGame.isOk(Simon.getRandArr(), Simon.getUserArr())

              if(loser){
                PlayGame.lostGame()
              }else{
                stage++
                c = 0
                Simon.emptyUserArr()
                Simon.generateRandArr()
                started = false
                step = Simon.getRandArr().length
                stageMsg.innerHTML = "Stage: "+stage+', Steps: '+step
                PlayGame.startGame(arr)
              }
            }
          }
        }

      }




      // enabling the event listeners to get user response
      // attaching listeners for the click on each pad

    },

    simonPlay(arr){
      //disable click when simon plays ??
      //
      let i = 0

      function animateOpacity(){

        if(i>= Simon.getRandArr().length){
          clearInterval(animate)
          middleBtn.firstChild.innerHTML = msg.user
          arr.map((pad, i) => {
            pad.addEventListener('click', handler, false)
          })
        }else{
          let padId = Simon.getRandArr()[i]
          let pad = document.getElementById(padId)
          pad.className = 'pad active'
          players[padId].play()

          setTimeout(function(){
            pad.className = 'pad'
            i++
          },1000)
        }

      }

      var animate = setInterval(animateOpacity, 2000)

      PlayGame.userPlay(arr)

    },

    resetGame(){
      //empty userArr and randArr
      Simon.emptyUserArr()
      Simon.emptyRandArr()

      started = false
      loser = false
      stage = 0

      middleBtn.firstChild.innerHTML = msg.start
    },

    lostGame(){
      middleBtn.firstChild.innerHTML = msg.over
      setTimeout(function(){
        PlayGame.resetGame()
      }, 1000)
    },

    isOk(arr1, arr2){
      //compare randArr and userArr


      let arr = arr1
        .map( (el, i) => {
          return arr1[i] === arr2[i]
        })
        .every(function(el){
          return el
        })

      return arr
    },

    isStarted(){
      return started
    },

    getStage(){
      return stage
    },

    getMiddleBtn(){
      return middleBtn
    }

  }
})()

export default PlayGame