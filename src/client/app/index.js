import StyleSheet from './style.scss'

import Simon from './Simon.js'

//
const padNodeList = document.querySelectorAll('.pad')
//
let padList = []
//
let clickedItems = Simon.getArr()

for (var i = 0; i < padNodeList.length; ++i) {
  padList.push(padNodeList[i])
}

// console.log(padList) => [{},{},{},{}]

// attaching listeners for the click on each pad
padList.map((pad) => {
  pad.addEventListener('click', () => {
    Simon.addToArr(pad.id)
  })
})

// printing randArr
console.log(Simon.generateRandArr(padList))


