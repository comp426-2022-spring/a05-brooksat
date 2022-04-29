// This directory contains general utilities that you can use as helper functions throughout other scripts
// Functions

function coinFlip() {
    let x = Math.random()
    if(x >= 0.5) {
      return 'heads'
    } else {
      return 'tails'
    }
  }
  
  function coinFlips(number) {
    var tosses = []
    for (var i = 0; i < number; i++) {
      tosses.push(coinFlip())
    }
    return tosses
  }
  
  function countFlips(array) {
    let count_tails = 0
    let count_heads = 0
    for(let i = 0; i < array.length; i++) {
      if(array[i] == 'tails') {
        count_tails++;
      } else if(array[i] == 'heads') {
        count_heads++;
      }
    }
  
    if(count_tails == 0) {
      return('{ heads: ' + count_heads + ' }')
    } else if (count_heads == 0) {
      return('{ tails: ' + count_tails + ' }')
    } else {
    return({'heads': count_heads, 'tails': count_tails})
    }
  }
  
  function flipACoin(call) {
    if(call == null) {
      return('Error: no input') //return error no input
    }
    if(call == 'heads' || call == 'tails') {
      let flip = coinFlip()
      let result = 'lose'
      if(flip == call) {
        result = 'win'
      }
      return("{ call: '" + call + "', flip: '" + flip + "', result: '" + result + "' }")
    } else {
      return('Usage: node guess-flip.js --call= [heads | tails]')
  
    }
    
  }
  
  function win(flip, call) {
    let result = 'lose'
    if(flip == call) {
      result = 'win'
    }
    return(result)
  }
  

  function countTails(flips) {
    let countT = 0;
    for(var i = 0; i < flips.length; i++) {
      if(flips[i] == 'tails') {
        countT++;
      }
    }
  
    return countT
  }
  
  function countHeads(flips) {
    let countH = 0;
    for(var i = 0; i < flips.length; i++) {
      if(flips[i] == 'heads') {
        countH++;
      }
    }
  
    return countH
  }
  module.exports = {coinFlip, coinFlips, countFlips, flipACoin, win, countHeads, countTails}