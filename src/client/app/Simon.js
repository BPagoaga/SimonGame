const Simon = (() => {
  // private attributes
  let userArr = []
  let randArr = []
  const colorArr = ['red', 'green', 'blue', 'yellow']

  return {
    // public methods

    addToArr(item){
      userArr.push(item)
    },

    generateRandArr(j=1){

      for( var i = 0; i<j; i++){
        let n = Math.floor(Math.random()*4)

        randArr.push(colorArr[n])
      }
      return randArr
    },

    getUserArr(){
      return userArr
    },

    getRandArr(){
      return randArr
    },

    emptyUserArr(){
      userArr = []
    },

    emptyRandArr(){
      randArr = []
    }
  }
})()

export default Simon