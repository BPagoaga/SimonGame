const Simon = (() => {
  // private attributes
  let stage = 0
  let arr = []

  return {
    // public methods
    addToArr(item){
      arr.push(item)
      console.log(arr)
    },

    generateRandArr(padList){
      let randArr = []

      padList.map( (pad) => {
        randArr.push(pad.id)
      })

      return randArr
    },

    getArr(){
      return arr
    }
  }
})()

export default Simon