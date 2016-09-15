import Simon from './Simon.js'

const PlayGame = (() => {
  //private attributes
  let started = false
  let loser = false
  let stage = 0
  let msg = {
    start: "Start",
    init: "Game Started",
    simon: "Simon Playing",
    user: "Your Turn",
    over: "Game Over !",
  }
  let handler

  //elements
  let middleBtn = document.getElementById('middle-btn')
  middleBtn.firstChild.innerHTML = msg.start

  let stageMsg = document.getElementById('stage')
  stageMsg.innerHTML = "Stage: "+stage

  //public methodes
  return {

    init(){
      // creating a random array
      let initRandArr = Simon.generateRandArr(5)
      middleBtn.firstChild.innerHTML = msg.init
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

      if(!handler){
        handler = function(event){

          let pad = event.currentTarget


          if(c < Simon.getRandArr().length){
            Simon.addToArr(pad.id)
            c++

            if(c === Simon.getRandArr().length){

              let loser = !PlayGame.isOk(Simon.getRandArr(), Simon.getUserArr())

              if(loser){
                PlayGame.lostGame()
              }else{
                stage++
                c = 0
                Simon.emptyUserArr()
                Simon.generateRandArr()
                started = false
                stageMsg.innerHTML = "Stage: "+stage
                PlayGame.startGame(arr)
              }
            }
          }
        }

      }

      arr.map((pad) => {
        pad.addEventListener('click', handler, false)
      })


      // enabling the event listeners to get user response
      // attaching listeners for the click on each pad

    },

    simonPlay(padList){
      let i = 0

      function animateOpacity(){

        if(i>= Simon.getRandArr().length){
          clearInterval(animate)
          middleBtn.firstChild.innerHTML = msg.user
        }else{
          document.getElementById(Simon.getRandArr()[i]).className = 'pad active'

          setTimeout(function(){
            document.getElementById(Simon.getRandArr()[i]).className = 'pad'
            i++
          },1000)
        }

      }

      var animate = setInterval(animateOpacity, 2000)

      PlayGame.userPlay(padList)

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