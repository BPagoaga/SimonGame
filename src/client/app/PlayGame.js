import Simon from './Simon.js'

const PlayGame = (() => {
  //private attributes
  let started = false
  let loser = false
  let strict = false
  let stage = 0
  let step = Simon.getRandArr().length
  let msg = {
    start: "Start",
    init: "Game Started",
    simon: "Simon Playing",
    user: "Your Turn",
    over: "Game Over !",
    win: "You won the game !",
    wrong: "Wrong Button !",
    restart: "Restarting..."
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

    init(arr){
      // creating a random array
      let initRandArr = Simon.generateRandArr(5)
      middleBtn.firstChild.innerHTML = msg.init
      step = Simon.getRandArr().length
      stageMsg.innerHTML = "Stage: "+stage+', Steps: '+step
      setTimeout(function(){
        PlayGame.startGame(arr)
      }, 1000)
    },

    startGame(padList){
      started = true
      PlayGame.simonPlay(padList)
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

          if(Simon.getRandArr()[c] === pad.id){
            Simon.addToArr(pad.id)
            c++

            if (c === Simon.getRandArr().length) {
              //disable user input when he finishes his turn, until simon finishes playing
              arr.map((pad, i) => {
                pad.removeEventListener('click', handler, false)
              })
              stage++
              if(stage === 20){
                PlayGame.winGame(arr)
              }
              c = 0
              Simon.emptyUserArr()
              Simon.generateRandArr()
              started = false
              step = Simon.getRandArr().length
              stageMsg.innerHTML = "Stage: "+stage+', Steps: '+step
              PlayGame.startGame(arr)
            }

          }else{
            if(!strict){
              //disable user input when we fail
              arr.map((pad) => {
                pad.removeEventListener('click', handler, false)
              })
              middleBtn.firstChild.innerHTML = msg.wrong
              Simon.emptyUserArr()
              setTimeout(
                function(){
                  PlayGame.simonPlay(arr)
                }, 1000)
            }else{
              PlayGame.lostGame(arr)
            }
          }
        }
      }

      if(arr && started){
        middleBtn.firstChild.innerHTML = msg.user
        arr.map((pad) => {
          pad.addEventListener('click', handler, false)
        })
      }else{
        return false
      }
    },

    simonPlay(arr){
      //
      let i = 0
      middleBtn.firstChild.innerHTML = msg.simon

      function round(){

        if(i>= Simon.getRandArr().length){
          clearInterval(animate)

          PlayGame.userPlay(arr)
        }else{
          let padId = Simon.getRandArr()[i]
          let pad = document.getElementById(padId)
          pad.className = 'pad active'
          players[padId].play()

          setTimeout(function(){
            pad.className = 'pad'
            i++
          },500)
        }

      }

      var animate = setInterval(round, 1000)

    },

    resetGame(arr){
      middleBtn.firstChild.innerHTML = msg.restart
      //empty userArr and randArr
      Simon.emptyUserArr()
      Simon.emptyRandArr()

      started = false
      loser = false
      stage = 0



      arr.map((pad) => {
        pad.removeEventListener('click', handler, false)
      })
      setTimeout(() => {
        middleBtn.firstChild.innerHTML = msg.start
        PlayGame.init()
      }, 1000)

    },

    lostGame(arr){
      middleBtn.firstChild.innerHTML = msg.over
      setTimeout(function(){
        PlayGame.resetGame(arr)
      }, 2000)
    },

    winGame(arr){
      middleBtn.firstChild.innerHTML = msg.win
      setTimeout(function(){
        PlayGame.resetGame(arr)
      }, 2000)
    },

    isStarted(){
      return started
    },

    getStage(){
      return stage
    },

    getMiddleBtn(){
      return middleBtn
    },

    toggleStrict(){
      strict = !strict
    }

  }
})()

export default PlayGame