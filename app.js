'use strict';

console.log('hey there hey!');

// ******* GLOBAL VARIABLES *******
let voteCount = 25;
let duckArray = [];

// ******* DOM REFERENCES *********
let imgContainer = document.getElementById('img-container');
let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');
let imgThree = document.getElementById('img-three');

let resultsBtn = document.getElementById('show-results-btn');
let resultsContainer = document.getElementById('results-container');

function Goose(){
  for(let i = 0; i < duckArray.length; i++){
    if(duckArray[i].name === 'sweep'){
      fileExtension = 'png'
      duckArray.push(fileExtension);
}
Goose();
// ******* CONSTRUCTOR FUNCTION ********

function Duck(name, fileExtension = 'jpg'){
  this.name = name;
  this.img = `img/${name}.${fileExtension}`;
  this.views = 0;
  this.clicks = 0;

  


 
  duckArray.push(this);
}
/*
while(this.name === 'sweep'){
  let fileExtension = 'png';
}
while(this.name !== 'sweep'){
  let fileExtension = 'jpg';
}
*/

duckArray.push(this);








// ****** HELPER FUNTCION / UTILITIES ******
function randomIndex(){
  return Math.floor(Math.random() * duckArray.length);
}


function renderImgs(){
  let imgOneIndex = randomIndex();
  let imgTwoIndex = randomIndex();
  let imgThreeIndex = randomIndex();

  // this will run and make sure they are unique
  // ? multiple conditions to check for with 3 images
  // ? OR use a container to store your 3 indexes and do your validation on that
  while(imgOneIndex === imgTwoIndex){
    imgTwoIndex = randomIndex();
  }
  while(imgOneIndex === imgThreeIndex){
    imgThreeIndex = randomIndex();
  }
  while(imgTwoIndex === imgThreeIndex){
    imgThreeIndex = randomIndex();
  }
  /*while(imgTwoIndex === imgOneIndex || imgThreeIndex){
    imgOneIndex = randomIndex();
  }
*/
  imgOne.src = duckArray[imgOneIndex].img;
  imgTwo.src = duckArray[imgTwoIndex].img;
  imgThree.src = duckArray[imgThreeIndex].img;

  duckArray[imgOneIndex].views++;
  duckArray[imgTwoIndex].views++;
  duckArray[imgThreeIndex].views++;

  imgOne.alt = duckArray[imgOneIndex].name;
  imgTwo.alt = duckArray[imgTwoIndex].name;
  imgThree.alt = duckArray[imgThreeIndex].name;
}

// ***** EVENT HANDLERS **********

function handleClick(event){
  console.dir(event.target);
  let imgClicked = event.target.alt;

  // TODO: Add clicks to the image that was clicked
  console.log('img clicked >>', imgClicked);

  for(let i = 0; i < duckArray.length; i++){
    if(duckArray[i].name === imgClicked){
      // increase vote counts
      duckArray[i].clicks++;
    }
  }

  // TODO: decrement the vote count
  voteCount--;

  // TODO: call the render img to reload new images
  renderImgs();

  // TODO: after voting rounds have ended... end the clicks!
  if(voteCount === 0){
    imgContainer.removeEventListener('click', handleClick);
  }
}

function handleShowResults(){
  // TODO: Display results - once there are no more votes left
  if(voteCount === 0){
    for(let i = 0; i < duckArray.length; i++){
      let liElem = document.createElement('li');
      liElem.textContent = `${duckArray[i].name} had ${duckArray[i].clicks} votes, and was seen ${duckArray[i].views} times`;
      resultsContainer.appendChild(liElem);
    }
    resultsBtn.removeEventListener('click', handleShowResults);
  }
}

// ****** EXECUTABLE CODE ********

new Duck('bag');
new Duck('banana');
new Duck('bathroom');
new Duck('boots');
new Duck('breakfast');
new Duck('bubblegum');
new Duck('chair');
new Duck('cthulhu');
new Duck('dog-duck');
new Duck('dragon');
new Duck('pen');
new Duck('pet-sweep');
new Duck('scissors');
new Duck('shark');
new Duck('sweep');
new Duck('tauntaun');
new Duck('unicorn');
new Duck('water-can');
new Duck('wine-glass');


renderImgs();

imgContainer.addEventListener('click', handleClick);
resultsBtn.addEventListener('click', handleShowResults);
