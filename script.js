const gameContainer = document.getElementById("game");

const COLORS = [];

for (i=0; i<12; i=i+2){
  newColor = Math.floor(Math.random()*16777215).toString(16);
  COLORS[i]="#"+newColor;
  COLORS[i+1]="#"+newColor;
}

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

let cardCounter = 0;
let score =0;
let bestScore = null;

if(localStorage.getItem('best')){
  document.querySelector('#bestscore').innerText = "Best Score: " + localStorage.getItem('best');
}

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  
    if(event.target.classList.contains('match')){
      console.log('card is part of a match');
      return;
    }
    if(!event.target.classList.contains('flipped') && cardCounter < 2){
      console.log('card is not flipped or is part of a match');
      event.target.style.backgroundColor = event.target.classList;
      console.log('card now flipped');
      cardCounter++;
      console.log('counter + 1');
      event.target.classList.add('flipped');
      console.log('adding flipped class');
    }
    if(cardCounter === 2){
      console.log("2 cards were picked")
      setTimeout(function(){
        let cards = document.querySelectorAll('.flipped');
        console.log('flipped cards are ' + cards[0].style.backgroundColor + ' and ' + cards[1].style.backgroundColor);
        if (cards[0].style.backgroundColor === cards[1].style.backgroundColor){
          console.log("this is a match")
          console.log('adding match class');
          cards[0].classList.add('match');
          cards[1].classList.add('match');
          if(document.querySelectorAll('.match').length === 12){
            alert('winner');
            if(localStorage.getItem('best')){
              if(score<localStorage.getItem('best')){
                localStorage.setItem('best', score);
              }
            }else{
              localStorage.setItem('best', score);
            }
          }
        }else{
          console.log('this is not a match setting bg to white');
          cards[0].style.backgroundColor = 'white';
          cards[1].style.backgroundColor = 'white';
        }
        console.log('removing flipped class');
        cards[0].classList.remove('flipped');
        cards[1].classList.remove('flipped');
        console.log('no cards flipped');
        cardCounter = 0;
        score++;
        document.querySelector('#score').innerText='Score: ' + score;
      }, 1000)
    }

    console.log(cardCounter);

    
}

document.querySelector('#restartBtn').addEventListener('click', function(e){
  location.reload();
  return false;
})
// when the DOM loads
createDivsForColors(shuffledColors);