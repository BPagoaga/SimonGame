import Simon from './Simon.js'

const PlayGame = (() => {
  //private attributes
  let started = false
  let loser = false
  let stage = 0

  //public methodes
  return {

    init(){
      // creating a random array
      let initRandArr = Simon.generateRandArr(5)
    },

    startGame(){
      started = true
      PlayGame.simonPlay()
    },

    userPlay(arr, callback){
      // add a counter for the click
      let c = 0
      // enabling the event listeners to get user response
      // attaching listeners for the click on each pad
      arr.map((pad) => {

        pad.addEventListener(
          'click',
          function(){
            if(c < Simon.getRandArr().length){
              Simon.addToArr(pad.id)
              c++
              if(c === Simon.getRandArr().length){
                loser = !callback(Simon.getRandArr(), Simon.getUserArr())
                console.log(loser)
                PlayGame.lostGame()
              }
            }
          }
        )
      })
    },

    simonPlay(){
      let i = 0

      function animateOpacity(){

        if(i>= Simon.getRandArr().length - 1){
          clearInterval(animate)
        }

        document.getElementById(Simon.getRandArr()[i]).className = 'pad active'

        setTimeout(function(){
          document.getElementById(Simon.getRandArr()[i]).className = 'pad'
        },1000)

        i++

      }

      var animate = setInterval(animateOpacity, 2000)

    },

    resetGame(){
      //empty userArr and randArr
      Simon.emptyArr()
      alert('Game restarted')
    },

    lostGame(){
      if(loser){
        alert("Game Over, try again !")
        PlayGame.resetGame()
      }
    },

    isOk(arr1, arr2){
      //compare randArr and userArr
      return arr1 === arr2
    },

    isStarted(){
      return started
    }
  }
})()

export default PlayGame